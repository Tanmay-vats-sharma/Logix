const ActiveBiddingIndicator = ({ activeBidProject, projects }) => {
  if (!activeBidProject) return null;
  const project = projects.find((p) => p.id === activeBidProject);
  return (
    <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-500/50">
      <div className="animate-pulse h-3 w-3 rounded-full bg-purple-400 inline-block mr-2"></div>
      Active bidding on: {project?.name}
    </div>
  );
};

export default ActiveBiddingIndicator;
