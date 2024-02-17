const BigCard = ({ component }: { component: React.ReactNode }) => {
  return (
    <div className="h-[32rem] w-full overflow-hidden rounded-lg bg-white shadow-lg shadow-gray-200 dark:bg-gray-900 dark:shadow-gray-900">
      {component}
    </div>
  );
};

export default BigCard;
