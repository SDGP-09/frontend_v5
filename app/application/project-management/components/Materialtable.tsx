'use client';
import { useState } from 'react';
import { Trash, Edit, Plus, CheckCircle, AlertTriangle, DollarSign, Package, Archive, X } from 'lucide-react';

interface Material {
    id: number;
    type: string;
    quantity: number;
    pricePerUnit: number;
    paymentStatus: 'Pending' | 'Completed';
}

export function MaterialTable() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [newMaterial, setNewMaterial] = useState<Material>({
        id: 0,
        type: '',
        quantity: 1,
        pricePerUnit: 0,
        paymentStatus: 'Pending',
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleAddMaterial = () => {
        if (newMaterial.type.trim() === '' || newMaterial.pricePerUnit <= 0) return;

        if (editingId !== null) {
            setMaterials(materials.map(mat => mat.id === editingId ? newMaterial : mat));
            setEditingId(null);
        } else {
            setMaterials([...materials, { ...newMaterial, id: Date.now() }]);
        }
        setNewMaterial({ id: 0, type: '', quantity: 1, pricePerUnit: 0, paymentStatus: 'Pending' });
        setIsFormOpen(false);
    };

    const handleEdit = (material: Material) => {
        setNewMaterial(material);
        setEditingId(material.id);
        setIsFormOpen(true);
    };

    const handleDelete = (id: number) => {
        setMaterials(materials.filter(material => material.id !== id));
    };

    const cancelEdit = () => {
        setEditingId(null);
        setNewMaterial({ id: 0, type: '', quantity: 1, pricePerUnit: 0, paymentStatus: 'Pending' });
        setIsFormOpen(false);
    };

    const finalTotalAmount = materials.reduce((sum, mat) => sum + mat.quantity * mat.pricePerUnit, 0);
    const totalPendingAmount = materials
        .filter(mat => mat.paymentStatus === 'Pending')
        .reduce((sum, mat) => sum + mat.quantity * mat.pricePerUnit, 0);
    const totalPaidAmount = materials
        .filter(mat => mat.paymentStatus === 'Completed')
        .reduce((sum, mat) => sum + mat.quantity * mat.pricePerUnit, 0);

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <Package className="mr-3 h-6 w-6"/>
                        Materials Estimate
                    </h2>
                    <p className="text-blue-100 mt-1">Track materials and costs for this task</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className={`${isFormOpen ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-white text-blue-600 hover:bg-blue-50'} 
        w-12 h-12 rounded-full flex items-center justify-center transition-all font-medium`}
                >
                    {isFormOpen ? (
                        <>
                            <X className="h-5 w-5"/>
                        </>
                    ) : (
                        <>
                            <Plus className="h-5 w-5"/>
                        </>
                    )}
                </button>

            </div>


            {/* Add/Edit Form */}
            {isFormOpen && (
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        {editingId ? 'Update Material' : 'Add New Material'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Material Type</label>
                            <input
                                type="text"
                                placeholder="e.g., Cement, Lumber, Paint"
                                value={newMaterial.type}
                                onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm  transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                value={newMaterial.quantity}
                                onChange={(e) => setNewMaterial({ ...newMaterial, quantity: parseInt(e.target.value) })}
                                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm "
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Unit ($)</label>
                            <input
                                type="text"
                                min="0"
                                step="1"
                                value={newMaterial.pricePerUnit||''}
                                onChange={(e) => setNewMaterial({ ...newMaterial, pricePerUnit: parseFloat(e.target.value) })}
                                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm "
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                            <select
                                value={newMaterial.paymentStatus}
                                onChange={(e) => setNewMaterial({ ...newMaterial, paymentStatus: e.target.value as 'Pending' | 'Completed' })}
                                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm "
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            onClick={cancelEdit}
                            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddMaterial}
                            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition font-medium flex items-center"
                        >
                            {editingId ? (
                                <>
                                    <CheckCircle className="mr-2 h-5 w-5" />
                                    Update Material
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 h-5 w-5" />
                                    Add Material
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Materials List */}
            <div className="p-6">
                {materials.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse rounded-lg overflow-hidden">
                                <thead>
                                <tr className="bg-gray-600">
                                    <th className="border border-gray-300 px-3 py-2 text-center text-white font-medium text-sm">Material
                                        Type
                                    </th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-white font-medium text-sm">Quantity</th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-white font-medium text-sm">Price
                                        Per Unit
                                    </th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-white font-medium text-sm">Total</th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-white font-medium text-sm">Payment
                                        Status
                                    </th>
                                    <th className="border border-gray-300 px-3 py-2 text-center text-white font-medium text-sm">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {materials.map(material => (
                                    <tr key={material.id}
                                        className="hover:bg-gray-100 transition-all duration-200 ease-in-out">
                                        <td className="border border-gray-300 px-3 py-2 text-center text-gray-700 font-medium">{material.type}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-center text-gray-700 font-medium">{material.quantity}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-center text-gray-700 font-medium">${material.pricePerUnit.toFixed(2)}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-center text-gray-700 font-medium">${(material.quantity * material.pricePerUnit).toFixed(2)}</td>
                                        <td className="border border-gray-300 px-3 py-2 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            material.paymentStatus === 'Completed'
                                ? 'bg-green-200 text-green-700'
                                : 'bg-yellow-200 text-yellow-600'
                        }`}>
                            {material.paymentStatus === 'Completed' ? (
                                <CheckCircle className="w-4 h-4 mr-1.5"/>
                            ) : (
                                <AlertTriangle className="w-4 h-4 mr-1.5"/>
                            )}
                            {material.paymentStatus}
                        </span>
                                        </td>
                                        <td className="border border-gray-200 px-3 py-2 text-center">
                                            <div className="flex items-center justify-center space-x-3">
                                                <button
                                                    onClick={() => handleEdit(material)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                                                    title="Edit"
                                                >
                                                    <Edit size={18}/>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(material.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                                                    title="Delete"
                                                >
                                                    <Trash size={18}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>


                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-blue-50 rounded-xl p-4 flex items-center">
                                <div
                                    className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                    <DollarSign className="w-6 h-6 text-blue-600"/>
                                </div>
                                <div>
                                    <p className="text-blue-800 text-sm font-medium">Total Estimate</p>
                                    <p className="text-2xl font-bold text-blue-900">${finalTotalAmount.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-xl p-4 flex items-center">
                                <div
                                    className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                    <CheckCircle className="w-6 h-6 text-green-600"/>
                                </div>
                                <div>
                                    <p className="text-green-800 text-sm font-medium">Paid Amount</p>
                                    <p className="text-2xl font-bold text-green-900">${totalPaidAmount.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="bg-yellow-50 rounded-xl p-4 flex items-center">
                                <div
                                    className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                                    <AlertTriangle className="w-6 h-6 text-yellow-600"/>
                                </div>
                                <div>
                                    <p className="text-yellow-800 text-sm font-medium">Pending Amount</p>
                                    <p className="text-2xl font-bold text-yellow-900">${totalPendingAmount.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10">
                        <div className="bg-gray-100 inline-flex rounded-full p-4 mb-4">
                            <Archive className="h-8 w-8 text-gray-400"/>
                        </div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">No Materials Added</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">
                            Add materials to keep track of your expenses and inventory for this task.
                        </p>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition font-medium inline-flex items-center"
                        >
                            <Plus className="mr-2 h-5 w-5"/>
                            Add Your First Material
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}