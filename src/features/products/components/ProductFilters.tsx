import { useState, useEffect } from 'react';

import type {
	ProductFilters as ProductFiltersType,
	ProductStatus,
} from '../types';

type FilterProps = {
	filters: ProductFiltersType;
	onChange: (next: ProductFiltersType) => void;
	isFetching?: boolean;
	categories?: string[];
};

const STATUS_OPTIONS: Array<{
	label: string;
	value: ProductFiltersType['status'];
}> = [
	{ label: 'All', value: 'all' },
	{ label: 'Active', value: 'active' },
	{ label: 'Draft', value: 'draft' },
	{ label: 'Archived', value: 'archived' },
];

export const ProductFilters = ({
	filters,
	onChange,
	isFetching = false,
	categories,
}: FilterProps) => {
	const status = (filters.status ?? 'all') as 'all' | ProductStatus;
	const category = filters.category ?? 'all';

	// For reference,
	// isLoading - only true on the very first fetch
	// isFetching - true whenever a fetch is happening (including refetches)

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange({
			...filters,
			search: e.target.value,
			page: 1, // reset pagination when filters change
		});
	};

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const v = e.target.value as 'all' | ProductStatus;
		onChange({
			...filters,
			status: v,
			page: 1,
		});
	};

	const handleCategoryChange = (
		e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
	) => {
		const v = e.target.value;
		onChange({
			...filters,
			category: v === '' ? 'all' : v,
			page: 1,
		});
	};

	const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange({
			...filters,
			minPrice: toNumberOrUndefined(e.target.value),
			page: 1,
		});
	};

	const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange({
			...filters,
			maxPrice: toNumberOrUndefined(e.target.value),
			page: 1,
		});
	};

	const clearFilters = () => {
		onChange({
			...filters,
			search: '',
			status: 'all',
			category: 'all',
			minPrice: undefined,
			maxPrice: undefined,
			page: 1,
		});
	};

	const hasActiveFilters =
		(filters.search ?? '').trim().length > 0 ||
		(filters.status ?? 'all') !== 'all' ||
		(filters.category ?? 'all') !== 'all' ||
		filters.minPrice != null ||
		filters.maxPrice != null;

	return (
		<div className="rounded-lg border bg-white p-4">
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-2">
					<h2 className="text-sm font-semibold text-gray-900">Filters</h2>
					{isFetching && (
						<span className="text-xs text-gray-500" aria-live="polite">
							Updating…
						</span>
					)}
				</div>

				<button
					type="button"
					onClick={clearFilters}
					disabled={!hasActiveFilters}
					className="text-sm underline disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Clear
				</button>
			</div>

			<div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-12">
				{/* Search */}
				<div className="md:col-span-4">
					<label
						htmlFor="product-search"
						className="block text-xs font-medium text-gray-700"
					>
						Search
					</label>
					<input
						id="product-search"
						type="text"
						value={filters.search ?? ''}
						onChange={handleSearchChange}
						placeholder="Search name or SKU…"
						className="mt-1 w-full rounded border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring"
					/>
				</div>

				{/* Status */}
				<div className="md:col-span-2">
					<label
						htmlFor="product-status"
						className="block text-xs font-medium text-gray-700"
					>
						Status
					</label>
					<select
						id="product-status"
						value={status}
						onChange={handleStatusChange}
						className="mt-1 w-full rounded border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring"
					>
						{STATUS_OPTIONS.map((opt) => (
							<option key={opt.label} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
				</div>

				{/* Category */}
				<div className="md:col-span-3">
					<label
						htmlFor="product-category"
						className="block text-xs font-medium text-gray-700"
					>
						Category
					</label>

					{categories && categories.length > 0 ? (
						<select
							id="product-category"
							value={category}
							onChange={handleCategoryChange}
							className="mt-1 w-full rounded border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring"
						>
							<option value="all">All</option>
							{categories.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
					) : (
						<input
							id="product-category"
							type="text"
							value={category === 'all' ? '' : String(category)}
							onChange={handleCategoryChange}
							placeholder="All categories"
							className="mt-1 w-full rounded border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring"
						/>
					)}
				</div>

				{/* Min price */}
				<div className="md:col-span-1">
					<label
						htmlFor="min-price"
						className="block text-xs font-medium text-gray-700"
					>
						Min
					</label>
					<input
						id="min-price"
						type="number"
						inputMode="decimal"
						min={0}
						value={filters.minPrice ?? ''}
						onChange={handleMinPriceChange}
						placeholder="£0"
						className="mt-1 w-full rounded border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring"
					/>
				</div>

				{/* Max price */}
				<div className="md:col-span-1">
					<label
						htmlFor="max-price"
						className="block text-xs font-medium text-gray-700"
					>
						Max
					</label>
					<input
						id="max-price"
						type="number"
						inputMode="decimal"
						min={0}
						value={filters.maxPrice ?? ''}
						onChange={handleMaxPriceChange}
						placeholder="£999"
						className="mt-1 w-full rounded border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring"
					/>
				</div>

				{/* Page size */}
				<div className="md:col-span-1">
					<label
						htmlFor="page-size"
						className="block text-xs font-medium text-gray-700"
					>
						Page
					</label>
					<select
						id="page-size"
						value={filters.pageSize ?? 10}
						onChange={(e) =>
							onChange({
								...filters,
								pageSize: Number(e.target.value),
								page: 1,
							})
						}
						className="mt-1 w-full rounded border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring"
					>
						{[10, 20, 50, 100].map((n) => (
							<option key={n} value={n}>
								{n}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default ProductFilters;
