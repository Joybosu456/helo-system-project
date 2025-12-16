"use client";

import CommonStatusBadge from "../components/CommonStatusBadge";

export default function StatusPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Badge/Status</h2>

      <div className="grid grid-cols-3 gap-6">
        {/* Column 1: outline pill */}
        <div className="space-y-3">
          <CommonStatusBadge variant="outline" tone="danger" />
          <CommonStatusBadge variant="outline" tone="warning" />
          <CommonStatusBadge variant="outline" tone="success" />
          <CommonStatusBadge variant="outline" tone="info" />
          <CommonStatusBadge variant="outline" tone="neutral" />
        </div>

        {/* Column 2: solid pill */}
        <div className="space-y-3">
          <CommonStatusBadge variant="solid" tone="danger" />
          <CommonStatusBadge variant="solid" tone="warning" />
          <CommonStatusBadge variant="solid" tone="success" />
          <CommonStatusBadge variant="solid" tone="info" />
          <CommonStatusBadge variant="solid" tone="neutral" />
        </div>

        {/* Column 3: text */} 
        <div className="space-y-3">
          <CommonStatusBadge variant="text" tone="danger" />
          <CommonStatusBadge variant="text" tone="warning" />
          <CommonStatusBadge variant="text" tone="success" />
          <CommonStatusBadge variant="text" tone="info" />
          <CommonStatusBadge variant="text" tone="neutral" />
        </div>
      </div>
    </div>
  );
}

