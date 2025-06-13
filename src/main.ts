/*
 * @Author: TuXunJia
 * @Date: 2025-06-12 12:22:30
 * @LastEditors: TuXunJia
 * @LastEditTime: 2025-06-13 16:32:49
 */
import { Request } from "../lib/umiRequest";
import { useTablePagination } from "../lib/useTablePagination";

const { tableProps } = useTablePagination(
	async (req: { current: number; pageSize: number; [key: string]: any }) => {
		const { current = 1, pageSize = 10 } = req ?? {};
		const res = await Request.post(
			`https://chief-dev.yifengx.com/yf-hearth-api/report-rule-scheme/total-page`,
			{ page: current, rows: pageSize, param: {} }
		);
		return { total: res.totalSize, list: res.result };
	},
	{}
);

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
