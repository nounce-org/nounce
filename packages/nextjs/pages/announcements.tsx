import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Announcements: NextPage = () => {
  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "Announcer",
    eventName: "Announcement",
    fromBlock: 1n,
    blockData: true,
    filters: {},
    transactionData: true,
    receiptData: true,
  });

  return (
    <>
      <MetaHeader title="Announcements" description="Event Announcements" />
      <div>
        {isLoadingEvents && <p>Loading events...</p>}
        {errorReadingEvents && <p>Error loading events: {errorReadingEvents}</p>}
        {events && events.length > 0 ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mx-6">
            {events.map((event, index) => {
              const { signer, signature, timestamp, data } = event.args;
              const scheme = data ? JSON.parse(data) : {};
              return (
                <div className="card w-full bg-base-100" key={index}>
                  <div className="card-body">
                    <h2 className="card-title">
                      {scheme.headline ? scheme.headline : "-"}
                      <div className="badge badge-ghost">
                        {timestamp ? new Date(Number(timestamp * 1000n)).toLocaleString() : "Unknown"}
                      </div>
                    </h2>
                    <div className="w-full flex flex-col">
                      <div className="overflow-scroll">{scheme.url ? scheme.url : ""} </div>

                      <div className="flex flex-row gap-6">
                        Signed by:
                        <Address address={signer} />{" "}
                      </div>

                      <div className="flex flex-row gap-6">
                        Published by:
                        <Address address={event.transaction.from} />{" "}
                      </div>
                      <div className="overflow-scroll"> Signature: {signature} </div>
                    </div>

                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">TX</div>
                      <div className="badge badge-primary">✓</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </>
  );
};

export default Announcements;
