type TicketPurchaserProps = {
  ticketCount: number;
  setTicketCount: (count: number) => void;
  handleBuyTickets: () => void;
  buttonClass: string;
};

export default function TicketPurchaser({
  ticketCount,
  setTicketCount,
  handleBuyTickets,
  buttonClass,
}: TicketPurchaserProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 rounded-2xl mb-6 border border-cyan-500/30">
      <p className="font-bold mb-4 text-cyan-400">Buy Lottery Tickets</p>
      <div className="flex justify-between mb-4">
        <input
          type="number"
          value={ticketCount}
          onChange={(e) => setTicketCount(Number(e.target.value))}
          className="bg-black/50 p-2 rounded-lg w-1/2 text-cyan-400 border border-cyan-500/30"
        />
        <button onClick={handleBuyTickets} className={buttonClass}>
          Buy
        </button>
      </div>
    </div>
  );
}
