/*
 * @Author: TuXunJia
 * @Date: 2025-05-15 17:00:21
 * @LastEditors: TuXunJia
 * @LastEditTime: 2025-06-12 19:48:04
 * @Description: 封装vue-request的pagination，返回tableProps
 */
import { message, TableProps } from "ant-design-vue";
import { computed, reactive, Ref } from "vue";
import {
	PaginationOptions,
	PaginationQueryResult,
	Service,
	usePagination,
} from "vue-request";

export interface ITablePaginationProps {
	loading: Ref<boolean>;
	tableProps: Ref<TableProps>;
	getTableData: (...args: any[]) => void;
	mutateTableData: PaginationQueryResult<any, any>["mutate"];
	refreshTableData: () => void;
	cancelGetTableData: () => void;
	showPagination: (visible: boolean) => void;
}

/**
 * @description: 封装vue-request的pagination，返回tableProps
 * @Date: 2025-06-12 11:20:49
 * @param {Service<R, P>} service 请求服务
 * @param {PaginationOptions<R, P>} options 请求配置
 * @return {ITablePaginationProps}
 */
export const useTablePagination = <
	R extends { total: number; list: any[] },
	P extends unknown[] = any
>(
	service: Service<R, P>,
	options?: PaginationOptions<R, P>
): ITablePaginationProps => {
	const state = reactive({
		paginationVisible: true,
	});

	const {
		loading,
		run,
		refresh: refreshTableData,
		cancel: cancelGetTableData,
		mutate: mutateTableData,
		data,
		current,
		pageSize,
		total,
		// params,
		changePagination,
	} = usePagination<R, P>(service, {
		manual: true,
		onError: (e) => message.error(e.message),
		...(options ?? {}),
		pagination: {
			currentKey: "current",
			pageSizeKey: "pageSize",
			totalKey: "total",
			totalPageKey: "totalPage",
		},
		// defaultParams: [
		// 	{
		// 		pageSize: 10,
		// 	},
		// ] as unknown as P,
	});

	const tableProps = computed<TableProps>(() => {
		return {
			bordered: true,
			loading: loading.value,
			dataSource: data.value?.list ?? [],
			pagination: !state.paginationVisible
				? false
				: {
						current: current.value,
						// pageSize: pageSize.value,
						pageSize: (() => {
							// if (pageSize.value === 10) {
							//   return 15;
							// }
							return pageSize.value;
						})(),
						total: total.value,
						showSizeChanger: true,
						showQuickJumper: true,
						// pageSizeOptions: ["10", "20", "50", "100"],
						// @ts-ignore
						pageSizeOptions: options?.defaultParams?.[0]?.pageSizeOptions ?? [
							"10",
							"20",
							"50",
							"100",
						],
						showTotal: (total: number) => `共有 ${total} 条记录`,
						onChange: (page, pageSize) => {
							changePagination(page, pageSize);
						},
				  },
		};
	});

	const getTableData = (...args: P) => {
		// args[0]是请求参数对象
		if (args.length > 0 && typeof args[0] === "object") {
			args[0] = { ...args[0], pageSize: pageSize.value };
		}
		run(...args);
	};

	const showPagination = (visible: boolean) => {
		state.paginationVisible = visible;
	};

	return {
		loading,
		tableProps,
		getTableData,
		mutateTableData,
		refreshTableData,
		cancelGetTableData,
		showPagination,
	};
};
