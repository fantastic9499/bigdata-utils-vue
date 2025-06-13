/*
 * @Author: TuXunJia
 * @Date: 2023-05-31 16:35:12
 * @LastEditors: TuXunJia
 * @LastEditTime: 2025-06-12 17:01:37
 * @Description: 基于umi-request的网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { notification } from "ant-design-vue";
import { extend } from "umi-request";

type ICode = Record<number, string>;
const codeMessage: ICode = {
	200: "服务器成功返回请求的数据。",
	201: "新建或修改数据成功。",
	202: "一个请求已经进入后台排队（异步任务）。",
	204: "删除数据成功。",
	400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
	401: "用户没有权限（令牌、用户名、密码错误）。",
	403: "用户得到授权，但是访问是被禁止的。",
	404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
	406: "请求的格式不可得。",
	410: "请求的资源被永久删除，且不会再得到的。",
	422: "当创建一个对象时，发生一个验证错误。",
	500: "服务器发生错误，请检查服务器。",
	502: "网关错误。",
	503: "服务不可用，服务器暂时过载或维护。",
	504: "网关超时。",
};

/**
 * @description: 异常处理程序
 * @Date: 2022-03-17 13:32:06
 * @param {object} error
 * @return {*}
 */
const errorHandler = (error: { response: Response }) => {
	const { response } = error;
	if (response && response.status >= 400) {
		const errorText = codeMessage[response.status] || response.statusText;
		const { status, url } = response;

		notification.error({
			message: `请求错误 ${status}: ${url}`,
			description: errorText,
		});
	}
};

/**
 * @description: 配置request请求时的默认参数
 * @Date: 2022-03-17 13:32:36
 */
const umiRequest = extend({
	timeout: 30000,
	errorHandler, // 默认错误处理
	// credentials: 'include', // 默认请求是否带上cookie
});

/**
 * @description: 拦截response统一错误处理
 * @Date: 2021-11-17 09:36:13
 * @param {*} response
 * @param {*} options
 * @return {*}
 */
umiRequest.interceptors.response.use(
	async (response) => {
		const contentType = response.headers.get("Content-Type");
		if (contentType !== "application/json") {
			return response;
		}
		const data = await response.clone().json();
		console.log(`request interceptors response: ${contentType}, data: `, data);
		if (data.message === "鉴权失败, token信息不匹配或已过期") {
			// by TuXunJia 2023.05.07
			data.message = "鉴权失败, token信息不匹配或已过期, 请重新登录!";
			return data;
		}
		if (data.msg) {
			data.message = data.msg;
			return data;
		}
		return response;
	},
	{ global: false }
);

/**
 * @description: post请求报文中添加_openx_head
 * @Date: 2021-09-28 22:45:22
 * @param {string} url
 * @param {any} options
 * @return {*}
 */
umiRequest.interceptors.request.use(
	(url: string, options: any) => {
		// const pl = localStorage.getItem("power-level") || "{}";
		const { data } = options;
		const newData = {
			...data,
			// powerLevel: url.includes('power/v2') ? undefined : JSON.parse(pl),
		};
		return {
			url: url,
			options: { ...options, data: JSON.stringify(newData) },
		};
	},
	{ global: false }
);
// umiRequest.interceptors.request.use(
//   (url: string, options: any) => {
//     const { _openx_header: header } = getUrlParams(window.location.href);
//     // const header = getUrlSearchParams('_openx_header');
//     let _openx_header: any = '';
//     if (header) {
//       // _openx_header = base62xDecode(header);
//       _openx_header = Base62.decode(header);
//       localStorage.setItem('_openx_header', _openx_header);
//     } else {
//       _openx_header = localStorage.getItem('_openx_header');
//     }
//     _openx_header = _openx_header ? _openx_header : '{}';
//     const { data } = options;
//     const newData = {
//       ...data,
//       _openx_head: JSON.parse(_openx_header),
//     };
//     return {
//       url: url,
//       options: { ...options, data: JSON.stringify(newData) },
//     };
//   },
//   { global: false }
// );

export default umiRequest;
