---
title: useTablePagination | BigDataUtilsVue
description: 表格分页hooks文档
---

# useTablePagination

#### 为ant-design-vue@3.x及以上版本table组件提供分页，基于vue-request usePagination二次封装

```vue
const { ...ReturnValues } = useTablePagination<R, P>(Service, Options);
```
##### Service
Service 它必须是一个返回 Promise 的函数，返回的结果必须为
```typescript
{total: number; list: any[]}
```

##### Options
同usePagination Options参数

##### ReturnValues类型
```typescript
interface ITablePaginationProps {
 loading: Ref<boolean>;
 tableProps: Ref<TableProps>;
 getTableData: (...args: any[]) => void;
 mutateTableData: PaginationQueryResult<any, any>["mutate"];
 refreshTableData: () => void;
 cancelGetTableData: () => void;
 showPagination: (visible: boolean) => void;
}
```