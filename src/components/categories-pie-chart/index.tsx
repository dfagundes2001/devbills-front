import { ResponsivePie } from '@nivo/pie';
import { useMemo } from 'react';
import { theme } from '../../styles/theme';
import { formatCurrency } from '../../utils/format-currency';
import type { Expense } from '../../services/api-types';

export type CategoryProps = {
	id: string;
	title: string;
	color: string;
};

type ChartData = {
	id: string;
	label: string;
	externalId: string;
	value: number;
	color: string;
};

type CategoriesPieChartProps = {
	onClick: (category: CategoryProps) => void;
	expenses?: Expense[];
};

export function CategoriesPieChart({ onClick, expenses }: CategoriesPieChartProps) {
	const data = useMemo<ChartData[]>(() => {
		if (expenses?.length) {
			const chartData: ChartData[] = expenses.map((item) => ({
				id: item.title,
				label: item.title,
				externalId: item._id,
				value: item.amount,
				color: item.color,
			}));
	
			return chartData;
		}

		return [];
	}, [expenses]);

	return (
		<ResponsivePie
			onClick={({ data }) =>
				onClick({
					id: data.externalId,
					title: data.id,
					color: data.color,
				})
			}
			data={data}
			enableArcLabels={false}
			enableArcLinkLabels={false}
			colors={({ data }) => data.color}
			margin={{ top: 20 }}
			valueFormat={formatCurrency}
			theme={{
				text: {
					fontSize: 10,
					fontFamily: 'Lexend',
				},
				tooltip: {
					container: {
						backgroundColor: theme.colors.black,
						padding: 16,
						color: theme.colors.white,
						fontFamily: 'Lexend',
						fontSize: 12,
						borderRadius: 4,
					},
				},
			}}
			legends={[
				{
					anchor: 'top',
					direction: 'row',
					justify: false,
					translateX: 0,
					translateY: -20,
					itemWidth: 120,
					itemHeight: 16,
					itemTextColor: theme.colors.neutral,
					itemDirection: 'left-to-right',
					itemOpacity: 1,
					symbolSize: 10,
					symbolShape: 'circle',
				},
			]}
		/>
	);
}
