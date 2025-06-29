// src/components/manage/CreatePanel.tsx
import { FolderPlus } from "lucide-react";

export const CreatePanel = () => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 h-full">
            <h3 className="font-bold text-xl text-slate-800 mb-6">Create New</h3>
            
            <form>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="folder-name" className="block text-sm font-medium text-slate-700 mb-1">
                            Folder Name
                        </label>
                        <input
                            type="text"
                            id="folder-name"
                            className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="My Awesome Project"
                        />
                    </div>
                     <div>
                        <label htmlFor="folder-color" className="block text-sm font-medium text-slate-700 mb-1">
                            Color Tag
                        </label>
                        <div className="flex gap-2">
                           {['#fbbf24', '#f87171', '#a78bfa', '#4ade80'].map(color => (
                               <button key={color} type="button" className="h-8 w-8 rounded-full border-2 border-transparent focus:border-slate-900" style={{ backgroundColor: color }}></button>
                           ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800"
                    >
                        <FolderPlus size={20} />
                        Create Folder
                    </button>
                </div>
            </form>
        </div>
    )
}