'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function SetupGuide() {
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const testConnection = async () => {
    if (!supabaseUrl || !supabaseKey) {
      toast.error('Please enter both Supabase URL and Key');
      return;
    }

    setIsConfiguring(true);
    try {
      const response = await fetch('/api/debug/users');
      const result = await response.json();
      
      if (result.success) {
        toast.success('Database connection successful!');
      } else {
        toast.error('Database connection failed. Check your credentials.');
      }
    } catch (error) {
      toast.error('Failed to test connection');
    } finally {
      setIsConfiguring(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">🔧 Setup Required</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your MedPal application needs to be connected to a Supabase database to work properly. 
          Follow the steps below to get everything working.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Step 1: Get Supabase Credentials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">Step 1</span>
              <span>Get Your Supabase Credentials</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                You need to get your Supabase project URL and API key from your Supabase dashboard.
              </p>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Go to Supabase Dashboard
              </Button>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>What to do:</strong>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                  <li>Sign in to your Supabase account</li>
                  <li>Open your project (or create a new one)</li>
                  <li>Go to Settings → API</li>
                  <li>Copy the Project URL and anon public key</li>
                </ol>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Step 2: Configure Environment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Step 2</span>
              <span>Configure Your Environment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Create a <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file in your project root with these values:
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="supabase-url">Supabase Project URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="supabase-url"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://your-project.supabase.co"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(supabaseUrl)}
                    disabled={!supabaseUrl}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supabase-key">Supabase Anon Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="supabase-key"
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    placeholder="your-anon-key-here"
                    type="password"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(supabaseKey)}
                    disabled={!supabaseKey}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>File location:</strong> Create <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> in your project root (same folder as package.json)
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Step 3: Test Connection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">Step 3</span>
            <span>Test Your Connection</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              After creating your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file, restart your development server and test the connection.
            </p>
            
            <div className="flex space-x-3">
              <Button
                onClick={testConnection}
                disabled={!supabaseUrl || !supabaseKey || isConfiguring}
                className="flex-1"
              >
                {isConfiguring ? 'Testing...' : 'Test Connection'}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.open('/api/debug/users', '_blank')}
              >
                Debug Endpoint
              </Button>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> After creating <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>, you must restart your development server with <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Environment File Template */}
      <Card>
        <CardHeader>
          <CardTitle>📁 Environment File Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="space-y-1">
              <div># Supabase Configuration</div>
              <div>NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here</div>
              <div></div>
              <div># Twilio Configuration (optional)</div>
              <div>TWILIO_ACCOUNT_SID=your_twilio_account_sid</div>
              <div>TWILIO_AUTH_TOKEN=your_twilio_auth_token</div>
              <div>TWILIO_PHONE_NUMBER=your_twilio_phone_number</div>
              <div></div>
              <div># Email Configuration (optional)</div>
              <div>EMAIL_USER=your.email@gmail.com</div>
              <div>EMAIL_PASS=your_16_character_app_password</div>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="mt-3"
            onClick={() => copyToClipboard(`# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here

# Twilio Configuration (optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email Configuration (optional)
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_16_character_app_password`)}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Template
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
