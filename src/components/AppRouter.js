import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {router} from "../routers/router";

const AppRouter = () => {
    return (
        <Routes>
            {router.map(route =>
                <Route
                    path={route.path}
                    key={route.name}
                    element={route.component}
                />
            )}

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
};

export default AppRouter;