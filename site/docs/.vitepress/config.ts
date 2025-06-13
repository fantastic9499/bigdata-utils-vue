/*
 * @Author: TuXunJia
 * @Date: 2025-06-13 14:46:58
 * @LastEditors: TuXunJia
 * @LastEditTime: 2025-06-13 16:51:23
 */
export default {
	themeConfig: {
		siteTitle: "Vue常用工具函数集",
		siteDescription: "Vue常用工具函数集",
		base:
			process.env.NODE_ENV === "production" ? "/bigdata-utils-vue-docs/" : "/",
		nav: [
			{ text: "指南", link: "/guide/installation" },
			{ text: "文档", link: "/utils/" },
		],
		socialLinks: [
			{ icon: "github", link: "https://github.com/TuXunJia/bigdata-utils-vue" },
		],
		sidebar: {
			"/guide/": [
				{
					text: "指南",
					items: [
						{
							text: "安装",
							link: "/guide/installation",
						},
					],
				},
			],
			"/utils/": [
				{
					text: "工具函数",
					items: [
						{
							text: "useTablePagination",
							link: "/utils/useTablePagination",
						},
					],
				},
			],
		},
	},
};
