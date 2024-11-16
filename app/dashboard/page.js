"use client";
import React from "react";
import Layout from "../../layouts/pagelayout";
import Dashboard from "./dashboard";

export default function Page() {
    return (
        <Layout topShow={true}>
            <Dashboard activeTab={1} ></Dashboard>
        </Layout>
    );
}
