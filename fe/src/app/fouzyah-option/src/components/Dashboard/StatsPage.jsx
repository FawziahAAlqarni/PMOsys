import React, { useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext';
import DashboardStats from './DashboardStats';

const StatsPage = () => {
  const { projects } = useContext(ProjectContext);
  return (
    <div className="fade-in">
        <DashboardStats projects={projects} />
    </div>
  );
};

export default StatsPage;