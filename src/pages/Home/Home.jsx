import React, { useEffect, useState } from "react";
import './Home.css';
import { populateDatabase } from "../../data/setup";
import { PageHeader, CustomerList } from "../../library";
import { getCustomerCount } from "../../data/api";

const Home = () => {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    async function setupDatabase() {
      console.log('Checking database, populating if needed...');
      await populateDatabase();
      console.log('Database is ready.');
      setIsDbReady(true);
    }

    setupDatabase();
  }, []);

  return (
    <div className="app-layout">
      <PageHeader />
      <main className="app-main-content">
        {isDbReady ? (
          <CustomerList isDbReady={isDbReady} />
        ) : (
          <div className="app-loading-container">
            <h2>Initializing 1,000,000 records...</h2>
            <p>This may take a minute on the first load.</p>
            <p>(Future loads will be instant)</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
