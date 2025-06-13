/*
 * @Author: TuXunJia
 * @Date: 2023-05-25 10:16:30
 * @LastEditors: TuXunJia
 * @LastEditTime: 2025-06-12 15:39:02
 * @Description: 公共的后端API请求 封装
 */
import { isObject } from "@yf-bigdata/bigdata-utils";
import qs from "querystringify";
import request from "./umiRequest";

export const Request = {
	/**
	 * @description: 通用的 post 请求
	 * @Date: 2023-07-12 19:19:59
	 * @param {string} url API 地址
	 * @param {TParams} params 请求入参
	 * @return {TData} 请求返回值
	 */
	post: async <TData, TParams>(
		url: string,
		params: TParams
	): Promise<TData> => {
		const { code, message, data } = await request.post(url, {
			data: params,
			headers: {
				"Content-Type": "application/json",
				token: (() => {
					const params = localStorage.getItem("iquery-params") || "";
					if (!params) {
						return "";
					}
					return JSON.parse(params).token;
				})(),
			},
		});
		if (code !== 0 && code !== 200) {
			throw new Error(message);
		}
		return data;
	},
	/**
	 * @description: 通用的 post 请求，不判断返回值
	 * @Date: 2023-08-01 14:38:48
	 * @param {string} url API地址
	 * @param {TParams} params 请求入参
	 * @return {TData} 请求返回值
	 */
	postRaw: async <TData, TParams>(
		url: string,
		params: TParams
	): Promise<TData> => {
		return request.post(url, {
			data: params,
			headers: {
				"Content-Type": "application/json",
				token: (() => {
					const params = localStorage.getItem("iquery-params") || "";
					if (!params) {
						return "";
					}
					return JSON.parse(params).token;
				})(),
			},
		});
	},
	/**
	 * @description: 通用的 get 请求
	 * @Date: 2023-08-01 14:31:04
	 * @param {string} url API 地址
	 * @return {TData} 返回值
	 */
	get: async <TData, TParams>(
		url: string,
		params?: TParams
	): Promise<TData> => {
		const { code, msg, message, data } = await request.get(
			(() => {
				if (!isObject(params)) {
					return url;
				}
				return `${url}${qs.stringify(params, true)}`;
			})(),
			{
				headers: {
					"Content-Type": "application/json",
					// 'Cache-Control': 'no-cache', // 加上这行，api接口报错
					token: (() => {
						const params = localStorage.getItem("iquery-params") || "";
						if (!params) {
							return "";
						}
						return JSON.parse(params).token;
					})(),
				},
			}
		);
		if (code !== 0 && code !== 200) {
			throw new Error(message || msg);
		}
		return data;
	},
	/**
	 * @description: 通用的 get 请求
	 * @Date: 2023-08-01 14:31:04
	 * @param {string} url API 地址
	 * @return {TData} 返回值
	 */
	getBlob: async <TData, TParams>(
		url: string,
		params?: TParams
	): Promise<TData> => {
		return request.get(
			(() => {
				if (!isObject(params)) {
					return url;
				}
				return `${url}${qs.stringify(params, true)}`;
			})(),
			{
				responseType: "blob",
				headers: {
					"Content-Type": "application/json",
					// 'Cache-Control': 'no-cache', // 加上这行，api接口报错
					token: (() => {
						const params = localStorage.getItem("iquery-params") || "";
						if (!params) {
							return "";
						}
						return JSON.parse(params).token;
					})(),
				},
			}
		);
	},
};
