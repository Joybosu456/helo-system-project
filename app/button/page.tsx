"use client";

import CommonButton from "../components/CommonButton";

export default function ButtonPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8">Button Components</h2>

      <div className="mb-6">
        <div className="grid grid-cols-6 gap-4">
          <CommonButton variant="filled" color="dark" className="bg-black">
            Button
          </CommonButton>
                    <CommonButton variant="filled" color="secondary" className="bg-gray-700">
            Button
          </CommonButton>
          
          <CommonButton variant="filled" color="gray" className="bg-gray-500">
            Button
          </CommonButton>
          
          <CommonButton 
            variant="filled" 
            color="dark" 
            className="bg-black focus:ring-4 focus:ring-blue-500 focus:ring-offset-2"
          >
            Button
          </CommonButton>
          
          <CommonButton variant="filled" color="light" className="bg-gray-200 text-gray-800">
            Button
          </CommonButton>
          
          <CommonButton variant="filled" color="primary" className="bg-blue-600">
            Button
          </CommonButton>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-6 gap-4">
          <CommonButton variant="outline" color="dark" className="bg-white border-black text-black">
            Button
          </CommonButton>
          
          <CommonButton variant="outline" color="light" className="bg-gray-50 border-gray-300 text-gray-700">
            Button
          </CommonButton>
          
          <CommonButton variant="outline" color="gray" className="bg-white border-gray-400 text-gray-600">
            Button
          </CommonButton>
          
          <CommonButton variant="outline" color="primary" className="bg-white border-blue-600 text-blue-600">
            Button
          </CommonButton>
          
          <CommonButton 
            variant="outline" 
            color="light" 
            disabled
            className="bg-gray-50 border-gray-200 text-gray-400"
          >
            Button
          </CommonButton>
          
          <CommonButton variant="outline" color="primary" className="bg-blue-50 border-blue-300 text-blue-600">
            Button
          </CommonButton>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-6 gap-4">
          <CommonButton variant="text" color="primary" className="bg-white text-blue-600">
            Button
          </CommonButton>
          
          <CommonButton variant="text" color="primary" className="bg-white text-blue-400">
            Button
          </CommonButton>
          
          <CommonButton variant="text" color="primary" className="bg-white text-blue-500">
            Button
          </CommonButton>
          
          <CommonButton variant="outline" color="primary" className="bg-white text-blue-600 border-blue-600">
            Button
          </CommonButton>
          
          <CommonButton variant="text" color="primary" disabled className="bg-white text-gray-400">
            Button
          </CommonButton>
          
          <CommonButton variant="text" color="primary" className="bg-white text-blue-600">
            Button
          </CommonButton>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-6 gap-4">
          <CommonButton variant="filled" color="danger" className="bg-red-600">
            Button
          </CommonButton>
          
          <CommonButton variant="filled" color="danger" className="bg-red-700">
            Button
          </CommonButton>
          
          <CommonButton variant="filled" color="danger" className="bg-red-500">
            Button
          </CommonButton>
          
          <CommonButton 
            variant="filled" 
            color="danger" 
            className="bg-red-600 focus:ring-4 focus:ring-red-500 focus:ring-offset-2"
          >
            Button
          </CommonButton>
          
          <CommonButton 
            variant="filled" 
            color="danger" 
            disabled
            className="bg-red-50 text-red-300"
          >
            Button
          </CommonButton>
          
          <CommonButton variant="filled" color="danger" className="bg-red-600">
            Button
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
