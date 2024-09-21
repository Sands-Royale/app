type TabNavigationProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function TabNavigation({
  activeTab,
  setActiveTab,
}: TabNavigationProps) {
  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={() => setActiveTab("tickets")}
        className={`px-4 py-2 ${
          activeTab === "tickets" ? "bg-cyan-500" : "bg-indigo-900"
        } rounded-l-lg`}
      >
        Buy Tickets
      </button>
      <button
        onClick={() => setActiveTab("liquidity")}
        className={`px-4 py-2 ${
          activeTab === "liquidity" ? "bg-cyan-500" : "bg-indigo-900"
        } rounded-r-lg`}
      >
        Liquidity
      </button>
    </div>
  );
}
