import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CharacterPage from '../pages/CharacterPage';
import Layout from '../layout';


const AppRouter: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={(<HomePage />)} />
                    <Route path="/character/:id" element={(<CharacterPage />)} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default AppRouter;
