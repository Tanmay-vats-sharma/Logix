const UserPoints = ({ userPoints }) => (
  <div className="p-4 bg-gray-700/50 rounded-lg">
    <div className="flex justify-between">
      <span>Your remaining points:</span>
      <span className="text-xl font-bold text-purple-400">{userPoints}</span>
    </div>
    <div className="mt-2 h-2 bg-gray-600 rounded-full">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
        style={{ width: `${(userPoints / 1000) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default UserPoints;
