import { useState } from "react"
import { LayoutDashboard, Server, Settings, HelpCircle, ChevronRight, ChevronDown } from "lucide-react"
import logo from '../assests/images/logo.png';
import shortLogo from '../assests/images/logo-s.png';
interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    dashboards: true,
  })

  const toggleItem = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div
      className={`bg-[#1a1d21] h-screen overflow-y-auto transition-all duration-300 border-r border-gray-700 ${isOpen ? "w-64" : "w-16"
        }`}
    >
      {/* Logo */}
      <div className="h-14 border-b border-gray-700 flex items-center justify-center">
        {isOpen ? (
          <img src={logo} alt="Logo" className="h-10" />
        ) : (
          <img src={shortLogo} alt="Short Logo" className="h-8" />
        )}
      </div>


      {/* Navigation */}
      <nav className="p-2">
        <div className="space-y-1">
          {/* Dashboards */}
          <div>
            <button
              className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-700 text-gray-300 hover:text-white"
              onClick={() => toggleItem("dashboards")}
            >
              <div className="flex items-center">
                <LayoutDashboard className="h-5 w-5 mr-3" />
                {isOpen && <span>Dashboard</span>}
              </div>
            </button>
          </div>



          {/* Settings */}
          <button className="w-full flex items-center p-2 rounded hover:bg-gray-700 text-gray-300 hover:text-white">
            <Settings className="h-5 w-5 mr-3" />
            {isOpen && <span>Settings</span>}
          </button>

          {/* Help */}
          <button className="w-full flex items-center p-2 rounded hover:bg-gray-700 text-gray-300 hover:text-white">
            <HelpCircle className="h-5 w-5 mr-3" />
            {isOpen && <span>Help</span>}
          </button>
        </div>
      </nav>
    </div>
  )
}
