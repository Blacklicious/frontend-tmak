import Head from 'next/head';
import React from 'react';

const ComingEvents: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Coming Events</title>
      </Head>
      
      <div className="calendar-container  bg-yellow-600/90 p-4 shadow-md">
        <iframe
            src="https://calendar.google.com/calendar/embed?src=mr.diallo%40nzirani.com&ctz=UTC"
            style={{
            border: '0',
            width: '100%',
            height: '80vh',
            }}
            title="Coming Events"
        >  
        </iframe>
      </div>
    </div>
  );
};

export default ComingEvents;




