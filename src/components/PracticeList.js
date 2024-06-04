import React from 'react';
import { usePractices } from '../context/PracticeContext';

function PracticeList() {
    const { practices , clearPractices } = usePractices();

    if (practices.length === 0) {
        return <div>No practices recorded.</div>
    }

    return (
            <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto p-4">
                    <h2 className="text-3xl font-bold text-gray-900">All Practices</h2>
                    <p className="mt-2 text-sm text-gray-700">A list of all practices recorded to date.</p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">Period</th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">Practice Type</th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">Rep</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Offensive Personnel</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Formation</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Formation Variation</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Backfield</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Motion</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">FIB</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Formation Family</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Unbalanced</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {practices.map((practice) => (
                                    <tr key={practice.id} className="even:bg-gray-50 hover:bg-gray-50">
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{practice.period}</td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{practice.practiceType}</td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{practice.rep}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{practice.offensivePersonnel}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{practice.formation}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{practice.formationVariation}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{practice.backfield}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{practice.motion}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{practice.fib}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{practice.formationFamily}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{practice.unbalanced}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            type="button"
                            onClick={clearPractices}
                            className="block rounded-md bg-blue-500 text-white px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Clear Practices
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default PracticeList;
