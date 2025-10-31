import React, { useEffect, useState } from "react";
import './Home.css'
import {populateDatabase} from "../../data/setup"
import { PageHeader, CustomerList } from "../../library";
import { getCustomerCount } from "../../data/api";

const Home = () => {
    const [isDbReady, setIsDbReady] = useState(false);

  // On initial app load, run the database population script
  useEffect(() => {
    async function setupDatabase() {
      console.log('Checking database, populating if needed...');
      
      // This will run the script, which skips if data already exists
      await populateDatabase();
      
      console.log('Database is ready.');
      // Once population is done, update the state to true
      setIsDbReady(true);
    }

    setupDatabase();
  }, []); // The empty array [] ensures this runs only ONCE

  return (
    <div className="app-layout">
      {/* 1. Your Top "DoubleTick" Header */}
      <PageHeader />

      {/* 2. The Main Content Area */}
      <main className="app-main-content">
        {isDbReady ? (
          // If the DB is ready, render the CustomerList component
          <CustomerList isDbReady={isDbReady} />
        ) : (
          // Otherwise, show a loading screen
          <div className="app-loading-container">
            <h2>Initializing 1,000,000 records...</h2>
            <p>This may take a minute on the first load.</p>
            <p>(Future loads will be instant)</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;