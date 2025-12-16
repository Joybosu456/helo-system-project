"use client";

import CommonBanner from "../components/CommonBanner";

export default function BannerPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Banner</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CommonBanner tone="neutral" description="Description" withIcon />
          <CommonBanner tone="info" description="Description" withIcon />
          <CommonBanner tone="success" description="Description" withIcon />
          <CommonBanner tone="warning" description="Description" withIcon />
          <CommonBanner tone="danger" description="Description" withIcon />
        </div>

        <div className="space-y-4">
          <CommonBanner tone="neutral" title="Title" description="Description" withIcon bordered />
          <CommonBanner tone="info" title="Title" description="Description" withIcon bordered />
          <CommonBanner tone="success" title="Title" description="Description" withIcon bordered />
          <CommonBanner tone="warning" title="Title" description="Description" withIcon bordered />
          <CommonBanner tone="danger" title="Title" description="Description" withIcon bordered />
        </div>
      </div>
    </div>
  );
}

