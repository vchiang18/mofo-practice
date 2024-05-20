import React from 'react';
import { usePractices } from '../context/PracticeContext';

function PracticeList() {
    const { practices } = usePractices();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Practices</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Offensive Personnel</th>
                            <th className="py-2 px-4 border-b">Formation</th>
                            <th className="py-2 px-4 border-b">Formation Variation</th>
                            <th className="py-2 px-4 border-b">Backfield</th>

                        </tr>
                    </thead>
                    <tbody>
                        {practices.map((practice) => (
                            <tr key={practice.id} className="hover: bg-gray-50">
                                <td className="py-2 px-4 border-b">{practice.id}</td>
                                <td className="py-2 px-4 border-b">{practice.offensivePersonnel}</td>
                                <td className="py-2 px-4 border-b">{practice.formation}</td>
                                <td className="py-2 px-4 border-b">{practice.formationVariation}</td>
                                <td className="py-2 px-4 border-b">{practice.backfield}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )

}

export default PracticeList;
