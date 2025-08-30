'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Package, 
  AlertTriangle, 
  Edit, 
  Trash2,
  Calendar
} from 'lucide-react';

interface MedicineStock {
  id: string;
  name: string;
  stock: number;
  expiry: string;
  lowStockThreshold: number;
}

export function MedicineInventory() {
  const [inventory, setInventory] = useState<MedicineStock[]>([
    { id: '1', name: 'Aspirin 100mg', stock: 25, expiry: '2024-12-15', lowStockThreshold: 10 },
    { id: '2', name: 'Metformin 500mg', stock: 3, expiry: '2025-01-20', lowStockThreshold: 5 },
    { id: '3', name: 'Vitamin D3', stock: 45, expiry: '2024-11-30', lowStockThreshold: 15 },
    { id: '4', name: 'Lisinopril 10mg', stock: 8, expiry: '2025-03-10', lowStockThreshold: 10 },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    stock: '',
    expiry: '',
    lowStockThreshold: ''
  });

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.stock && newMedicine.expiry) {
      const medicine: MedicineStock = {
        id: Date.now().toString(),
        name: newMedicine.name,
        stock: parseInt(newMedicine.stock),
        expiry: newMedicine.expiry,
        lowStockThreshold: parseInt(newMedicine.lowStockThreshold) || 10
      };
      setInventory([...inventory, medicine]);
      setNewMedicine({ name: '', stock: '', expiry: '', lowStockThreshold: '' });
      setIsAddModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const isLowStock = (item: MedicineStock) => item.stock <= item.lowStockThreshold;
  
  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const getStockStatus = (item: MedicineStock) => {
    if (isLowStock(item)) {
      return <Badge variant="destructive">Low Stock</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
  };

  const getExpiryStatus = (expiryDate: string) => {
    if (isExpiringSoon(expiryDate)) {
      return <Badge className="bg-orange-100 text-orange-800">Expiring Soon</Badge>;
    }
    return <Badge variant="secondary">Good</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medicine Inventory</h1>
          <p className="text-gray-600">Track your medicine stock and expiry dates</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Medicine to Inventory</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicine-name">Medicine Name</Label>
                <Input
                  id="medicine-name"
                  placeholder="e.g., Aspirin 100mg"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="e.g., 30"
                  value={newMedicine.stock}
                  onChange={(e) => setNewMedicine({...newMedicine, stock: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  type="date"
                  value={newMedicine.expiry}
                  onChange={(e) => setNewMedicine({...newMedicine, expiry: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="threshold">Low Stock Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  placeholder="e.g., 10"
                  value={newMedicine.lowStockThreshold}
                  onChange={(e) => setNewMedicine({...newMedicine, lowStockThreshold: e.target.value})}
                />
              </div>
              
              <Button onClick={handleAddMedicine} className="w-full">
                Add to Inventory
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-800">Low Stock Alert</p>
                <p className="text-sm text-orange-600">
                  {inventory.filter(isLowStock).length} medicines are running low
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800">Expiry Alert</p>
                <p className="text-sm text-red-600">
                  {inventory.filter(item => isExpiringSoon(item.expiry)).length} medicines expiring soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Inventory Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Stock</th>
                  <th className="text-left py-3 px-4">Expiry</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Package className="h-5 w-5 text-gray-400" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={isLowStock(item) ? 'text-red-600 font-medium' : 'text-gray-600'}>
                          {item.stock} tablets
                        </span>
                        {getStockStatus(item)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={isExpiringSoon(item.expiry) ? 'text-orange-600 font-medium' : 'text-gray-600'}>
                          {new Date(item.expiry).toLocaleDateString()}
                        </span>
                        {getExpiryStatus(item.expiry)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col space-y-1">
                        {getStockStatus(item)}
                        {isExpiringSoon(item.expiry) && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs">
                            Expires in {Math.ceil((new Date(item.expiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}