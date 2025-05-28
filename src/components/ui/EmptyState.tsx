import { FaSearch } from "react-icons/fa";
// -------------------------------

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({
  title,
  description
}: EmptyStateProps) => {
  return (
    <div className="flex-4/5 bg-white rounded-lg shadow-xs p-8 text-center border border-gray-100">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <FaSearch className="text-gray-400" size={24} />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
    </div>
  );
};
