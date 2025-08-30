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
  FileText, 
  Download, 
  Eye, 
  Trash2,
  Upload,
  Calendar
} from 'lucide-react';

interface MedicalDocument {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  url?: string;
}

export function MedicalDocuments() {
  const [documents, setDocuments] = useState<MedicalDocument[]>([
    { id: '1', name: 'Blood Test Report', type: 'Lab Report', date: '2024-01-10', size: '2.3 MB' },
    { id: '2', name: 'X-Ray Chest', type: 'Imaging', date: '2024-01-08', size: '5.1 MB' },
    { id: '3', name: 'Prescription - Dr. Smith', type: 'Prescription', date: '2024-01-05', size: '1.2 MB' },
    { id: '4', name: 'Vaccination Certificate', type: 'Certificate', date: '2023-12-20', size: '0.8 MB' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    type: 'Lab Report',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddDocument = () => {
    if (newDocument.name && newDocument.type && newDocument.date) {
      const document: MedicalDocument = {
        id: Date.now().toString(),
        name: newDocument.name,
        type: newDocument.type,
        date: newDocument.date,
        size: '1.0 MB' // Simulated size
      };
      setDocuments([...documents, document]);
      setNewDocument({ name: '', type: 'Lab Report', date: new Date().toISOString().split('T')[0] });
      setIsAddModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Lab Report':
        return 'bg-blue-100 text-blue-800';
      case 'Imaging':
        return 'bg-green-100 text-green-800';
      case 'Prescription':
        return 'bg-purple-100 text-purple-800';
      case 'Certificate':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Documents</h1>
          <p className="text-gray-600">Store and manage your medical records securely</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Medical Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doc-name">Document Name</Label>
                <Input
                  id="doc-name"
                  placeholder="e.g., Blood Test Report"
                  value={newDocument.name}
                  onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="doc-type">Document Type</Label>
                <select
                  id="doc-type"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newDocument.type}
                  onChange={(e) => setNewDocument({...newDocument, type: e.target.value})}
                >
                  <option value="Lab Report">Lab Report</option>
                  <option value="Imaging">Imaging</option>
                  <option value="Prescription">Prescription</option>
                  <option value="Certificate">Certificate</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="doc-date">Date</Label>
                <Input
                  id="doc-date"
                  type="date"
                  value={newDocument.date}
                  onChange={(e) => setNewDocument({...newDocument, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="doc-file">Upload File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
              
              <Button onClick={handleAddDocument} className="w-full">
                Add Document
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Lab Reports</p>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.filter(d => d.type === 'Lab Report').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Prescriptions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.filter(d => d.type === 'Prescription').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {documents.filter(d => new Date(d.date).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>All Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Size</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((document) => (
                    <tr key={document.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="font-medium">{document.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getTypeColor(document.type)}>
                          {document.type}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(document.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-gray-600">{document.size}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(document.id)}
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