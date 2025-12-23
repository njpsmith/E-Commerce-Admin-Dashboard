import * as React from 'react';
import type { ProductListItem, ProductStatus } from '../types';

type Props = {
  data: ProductListItem[];
  total: number;
  page: number;
  pageSize: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;

  /**
   * Optional callbacks for row actions. If you don't need them yet, omit them.
   */
  onRowClick?: (productId: string) => void;
  onEdit?: (productId: string) => void;
};

function formatMoney(n: number): string {
  // Simple GBP formatting; adjust as needed for your app.
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(n);
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

const StatusBadge: React.FC<{ status: ProductStatus }> = ({ status }) => {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  const classes =
    status === 'active'
      ? 'bg-green-100 text-green-800'
      : status === 'draft'
        ? 'bg-yellow-100 text-yellow-800'
        : 'bg-gray-200 text-gray-800';

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${classes}`}
    >
      {label}
    </span>
  );
};

const SkeletonRow: React.FC = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-3">
      <div className="h-4 w-40 rounded bg-gray-200" />
    </td>
    <td className="px-4 py-3">
      <div className="h-4 w-24 rounded bg-gray-200" />
    </td>
    <td className="px-4 py-3">
      <div className="h-4 w-20 rounded bg-gray-200" />
    </td>
    <td className="px-4 py-3">
      <div className="h-4 w-16 rounded bg-gray-200" />
    </td>
    <td className="px-4 py-3">
      <div className="h-5 w-16 rounded bg-gray-200" />
    </td>
    <td className="px-4 py-3">
      <div className="h-4 w-28 rounded bg-gray-200" />
    </td>
    <td className="px-4 py-3">
      <div className="h-8 w-14 rounded bg-gray-200" />
    </td>
  </tr>
);

export const ProductsTable: React.FC<Props> = ({
  data,
  total,
  page,
  pageSize,
  isLoading = false,
  onPageChange,
  onRowClick,
  onEdit,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = clamp(page, 1, totalPages);

  // If parent passes an out-of-range page (e.g. total changed), gently correct via UI only.
  const canPrev = safePage > 1;
  const canNext = safePage < totalPages;

  const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(total, safePage * pageSize);

  const showEmpty = !isLoading && data.length === 0;

  return (
    <div className="rounded-lg border bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-sm text-gray-700">
          {total > 0 ? (
            <>
              Showing <span className="font-medium">{start}</span>–
              <span className="font-medium">{end}</span> of{' '}
              <span className="font-medium">{total}</span>
            </>
          ) : (
            'No products'
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => canPrev && onPageChange(safePage - 1)}
            disabled={!canPrev || isLoading}
            className="rounded border px-3 py-1.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page <span className="font-medium">{safePage}</span> /{' '}
            <span className="font-medium">{totalPages}</span>
          </span>
          <button
            type="button"
            onClick={() => canNext && onPageChange(safePage + 1)}
            disabled={!canNext || isLoading}
            className="rounded border px-3 py-1.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-t text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {isLoading ? (
              <>
                {Array.from({ length: Math.min(8, pageSize) }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </>
            ) : showEmpty ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-gray-600"
                >
                  <div className="mx-auto max-w-md space-y-2">
                    <p className="font-medium text-gray-900">
                      No products found
                    </p>
                    <p className="text-gray-600">
                      Try changing your filters, or create your first product.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((p) => (
                <tr
                  key={p.id}
                  className={
                    onRowClick ? 'cursor-pointer hover:bg-gray-50' : undefined
                  }
                  onClick={() => onRowClick?.(p.id)}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{p.name}</div>
                    {p.category ? (
                      <div className="text-xs text-gray-500">{p.category}</div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">
                    {p.sku}
                  </td>
                  <td className="px-4 py-3">{formatMoney(p.price)}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(p.createdAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(p.id);
                      }}
                      className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
                      disabled={!onEdit}
                      aria-disabled={!onEdit}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t">
        <div className="text-xs text-gray-500">
          Tip: keep pagination stable with React Query{' '}
          <span className="font-mono">keepPreviousData</span>.
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => canPrev && onPageChange(1)}
            disabled={!canPrev || isLoading}
            className="rounded border px-3 py-1.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>
          <button
            type="button"
            onClick={() => canNext && onPageChange(totalPages)}
            disabled={!canNext || isLoading}
            className="rounded border px-3 py-1.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};
