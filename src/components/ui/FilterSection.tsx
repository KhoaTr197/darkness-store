const FilterSection = ({ title, options, selected  }: any) => (
  <div className="mb-6 px-2">
    <h3 className="text-md font-semibold text-gray-900 mb-3 border-b border-gray-200">{title}</h3>
    <div className="space-y-2">
      {options.map((option: string) => (
        <label key={option} className="flex items-center hover:text-primary-600 cursor-pointer transition-colors duration-150">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-sm"
          />
          <span className="ml-2 text-gray-700 text-sm group-hover:text-primary-600 transition-colors">{option}</span>
        </label>
      ))}
    </div>
  </div>
);
export default FilterSection;