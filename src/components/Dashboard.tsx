import { useState, useEffect } from "react";
import { RefreshCw, Settings, HelpCircle, Menu } from 'lucide-react';
import { Sidebar } from "./Sidebar";
import { Card } from "./Card";
import ProjectService from "../services/ProjectService";

interface DashboardProps {
    // You can add props here if needed
}

interface ApiData {
    getToken: {
        status_code: number;
        body: {
            access_token: string;
            token_type: string;
            expires_in: number;
        };
    };
    mcidSearch: {
        status_code: number;
        body: {
            requestID: string;
            processStatus: {
                completed: string;
                isMemput: string;
                errorCode: string;
                errorText: string;
            };
            mcidList: null;
            memkey: null;
            memidnum: null;
            matchScore: null;
        };
    };
    medicalSubmit: {
        status_code: number;
    };
}

export function Dashboard({ }: DashboardProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [projectDetails, setProjectDetails] = useState<ApiData | null>(null);
    const [lastRefreshedAt, setLastRefreshedAt] = useState<Date | null>(null);
    const [timeSinceRefresh, setTimeSinceRefresh] = useState("0 minutes ago");

    // const updateTimeText = (timestamp: Date) => {
    //     const diffMs = Date.now() - timestamp.getTime();
    //     const diffSecs = Math.floor(diffMs / 1000);
    //     const diffMins = Math.floor(diffSecs / 60);

    //     if (diffSecs < 60) {
    //         setTimeSinceRefresh("Just now");
    //     } else {
    //         setTimeSinceRefresh(`${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`);
    //     }
    // };

    const fetchData = async (isManual = false) => {
        if (isManual) setIsRefreshing(true);
        //   const apiData = await ProjectService.getAllApiUpdates();
        const apiData = {
            getToken: {
                status_code: 200,
                body: {
                    access_token: "your-token",
                    token_type: "Bearer",
                    expires_in: 899,
                },
            },
            mcidSearch: {
                status_code: 200,
                body: {
                    requestID: "1",
                    processStatus: {
                        completed: "true",
                        isMemput: "false",
                        errorCode: "ENOREC",
                        errorText: "no candidates found.",
                    },
                    mcidList: null,
                    memkey: null,
                    memidnum: null,
                    matchScore: null,
                },
            },
            medicalSubmit: {
                status_code: 200,
            },
        };

        setProjectDetails(apiData);
        const now = new Date();
        setLastRefreshedAt(now);
        // updateTimeText(now);

        if (isManual) setIsRefreshing(false);
    };

    useEffect(() => {
        fetchData(true);
    }, []);

    // Background auto-refresh every 60 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchData(false);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //     if (!lastRefreshedAt) return;
    //     const updateTime = () => updateTimeText(lastRefreshedAt);
    //     updateTime();
    //     const interval = setInterval(updateTime, 30000);
    //     return () => clearInterval(interval);
    // }, [lastRefreshedAt]);


    const handleManualRefresh = () => fetchData(true);

    return (
        <div className="flex h-screen bg-[#1e2124] text-white">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-14 border-b border-gray-700 flex items-center justify-between px-4">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="mr-2 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <div className="flex items-center">
                            <span className="font-semibold text-lg">Milliman Dashboard</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
                            <Settings className="h-5 w-5" />
                        </button>
                        <button className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
                            <HelpCircle className="h-5 w-5" />
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-2xl font-medium">APIs Monitoring</h1>
                        {/* {lastRefreshedAt && (
                            <p className="text-sm text-gray-400 mt-1">{timeSinceRefresh}</p>
                        )} */}

                        <div className="flex items-center gap-2">
                            <button
                                className="flex items-center px-3 py-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 text-gray-300"
                                onClick={handleManualRefresh}
                            >
                                {isRefreshing ? (
                                    <>
                                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                        Refreshing...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Refresh
                                    </>
                                )}
                            </button>

                        </div>
                    </div>

                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projectDetails && (
                            <>
                                <Card
                                    title="Token Status"
                                    data={[
                                        {
                                            name: "Token Status",
                                            value: projectDetails.getToken.status_code,
                                            color: projectDetails.getToken.status_code === 200 ? "green" : "red",
                                        },
                                    ]}
                                    centerText={
                                        projectDetails.getToken.status_code === 200
                                            ? "success\n"
                                            : "Failed"
                                    }
                                    latestRun="May 20, 2025"
                                    latestDataMed="124"
                                    latestDataRx="75"
                                    recordCount="1,234"
                                />

                                <Card
                                    title="MCID"
                                    data={[
                                        {
                                            name: "MCID Search",
                                            value: projectDetails.mcidSearch.status_code,
                                            color: projectDetails.mcidSearch.status_code === 200 ? "green" : "red",
                                        },
                                    ]}
                                    centerText={
                                        projectDetails.mcidSearch.status_code === 200
                                            ? "success\n"
                                            : "Failed"
                                    }
                                    latestRun="May 20, 2025"
                                    latestDataMed="124"
                                    latestDataRx="75"
                                    recordCount="1,234"
                                />

                                <Card
                                    title="Medical"
                                    data={[
                                        {
                                            name: "Medical Submit",
                                            value: projectDetails.medicalSubmit.status_code,
                                            color: projectDetails.medicalSubmit.status_code === 200 ? "green" : "red",
                                        },
                                    ]}
                                    centerText={
                                        projectDetails.medicalSubmit.status_code === 200
                                            ? "success\n"
                                            : "Failed"
                                    }
                                    latestRun="May 20, 2025"
                                    latestDataMed="124"
                                    latestDataRx="75"
                                    recordCount="1,234"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}