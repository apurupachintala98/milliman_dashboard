import { useState, useRef, useEffect } from "react"
import { ChevronDown, Plus, RefreshCw, Settings, HelpCircle, Menu } from 'lucide-react'
import { Sidebar } from "./Sidebar"
import { Card } from "./Card"
import { AreaChartCard } from "./AreaChartCard"
import { useChartData } from "../hooks/useChartData"
import { useRefreshIntervals, type RefreshInterval } from "../hooks/useRefreshIntervals"

interface DashboardProps {
    // You can add props here if needed
}

export function Dashboard({ }: DashboardProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { intervals, selectedInterval, setSelectedInterval } = useRefreshIntervals()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const {
        severityData,
        statusData,
        responseTimeData,
        errorRateData,
        endpointData,
        areaChartData,
        refreshData
    } = useChartData()

    // Close dropdown when clicking outside
    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
    //             setIsDropdownOpen(false)
    //         }
    //     }

    //     document.addEventListener("mousedown", handleClickOutside)
    //     return () => document.removeEventListener("mousedown", handleClickOutside)
    // }, [])

    useEffect(() => {
        const intervalId = setInterval(async () => {
            setIsRefreshing(true);
            await refreshData();
            setTimeout(() => setIsRefreshing(false), 1000);
        }, selectedInterval.value);

        return () => clearInterval(intervalId);
    }, [selectedInterval, refreshData]);


    const handleIntervalSelect = (interval: RefreshInterval) => {
        setSelectedInterval(interval)
        setIsDropdownOpen(false)
    }

    const handleManualRefresh = async () => {
        setIsRefreshing(true);
        await refreshData();
        setTimeout(() => setIsRefreshing(false), 1000); // Reset spinner after 1s
    };


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
                        <div className="flex items-center gap-2">
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    className="flex items-center px-3 py-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 text-gray-300"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    {selectedInterval.label} <ChevronDown className="h-4 w-4 ml-2" />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                                        {intervals.map((interval, index) => (
                                            <button
                                                key={index}
                                                className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                                                onClick={() => handleIntervalSelect(interval)}
                                            >
                                                {interval.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                className="flex items-center px-3 py-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 text-gray-300"
                                onClick={handleManualRefresh}
                            >
                                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                                {isRefreshing ? 'Refreshing...' : 'Refresh'}
                            </button>
                        </div>
                    </div>

                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card
                            title="PING"
                            data={severityData}
                            centerText={`1620
vulnerabilities`}
                            latestRun="May 20, 2025"
                            latestDataMed="124"
                            latestDataRx="75"
                            recordCount="1,234"
                        />

                        <Card
                            title="API"
                            data={statusData}
                            centerText={`1620
vulnerabilities`}
                            latestRun="May 20, 2025"
                            latestDataMed="124"
                            latestDataRx="75"
                            recordCount="1,234"
                        />

                        <Card
                            title="MCID"
                            data={responseTimeData}
                            centerText={`1620
vulnerabilities`}
                            latestRun="May 20, 2025"
                            latestDataMed="124"
                            latestDataRx="75"
                            recordCount="1,234"
                        />

                        <Card
                            title="MedClaims"
                            data={errorRateData}
                            centerText={`1620
vulnerabilities`}
                            latestRun="May 20, 2025"
                            latestDataMed="124"
                            latestDataRx="75"
                            recordCount="1,234"
                        />

                        <Card
                            title="RxClaims"
                            data={endpointData}
                            centerText={`1620
vulnerabilities`}
                            latestRun="May 20, 2025"
                            latestDataMed="124"
                            latestDataRx="75"
                            recordCount="1,234"
                        />

                        <AreaChartCard
                            title="Cumulative API Analysis"
                            data={areaChartData}
                            color="#3498db"
                            latestRun="May 20, 2025"
                            latestDataMed="124"
                            latestDataRx="75"
                            recordCount="1,234"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}