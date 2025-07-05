"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';

const EnvTest = () => {
  const [envStatus, setEnvStatus] = useState({});
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [authTestStatus, setAuthTestStatus] = useState('Not tested');

  useEffect(() => {
    // Check environment variables
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    setEnvStatus({
      url: url ? '✅ Set' : '❌ Missing',
      key: key ? '✅ Set' : '❌ Missing',
      urlValue: url ? `${url.substring(0, 20)}...` : 'Not set',
      keyValue: key ? `${key.substring(0, 10)}...` : 'Not set'
    });

    // Test Supabase connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          setConnectionStatus(`❌ Connection failed: ${error.message}`);
        } else {
          setConnectionStatus('✅ Connection successful');
        }
      } catch (error) {
        setConnectionStatus(`❌ Connection error: ${error.message}`);
      }
    };

    testConnection();
  }, []);

  const testAuth = async () => {
    setAuthTestStatus('Testing...');
    try {
      console.log('Testing direct Supabase auth...');
      
      // Test with a real email/password (you can change these)
      const testEmail = 'your-test-email@example.com';
      const testPassword = 'your-test-password';
      
      console.log('Attempting login with:', testEmail);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword
      });
      
      if (error) {
        console.log('Auth error:', error);
        setAuthTestStatus(`❌ Auth error: ${error.message}`);
      } else {
        console.log('Auth success:', data);
        setAuthTestStatus('✅ Auth working!');
      }
    } catch (error) {
      console.error('Auth test error:', error);
      setAuthTestStatus(`❌ Auth test failed: ${error.message}`);
    }
  };

  const testNetwork = async () => {
    try {
      console.log('Testing network connectivity...');
      const response = await fetch('https://httpbin.org/get');
      if (response.ok) {
        console.log('Network connectivity: ✅ OK');
        setAuthTestStatus('Network: ✅ OK');
      } else {
        console.log('Network connectivity: ❌ Failed');
        setAuthTestStatus('Network: ❌ Failed');
      }
    } catch (error) {
      console.error('Network test error:', error);
      setAuthTestStatus(`Network: ❌ ${error.message}`);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white">
      <h3 className="text-lg font-bold mb-4">Environment Variables Test</h3>
      <div className="space-y-2">
        <div>NEXT_PUBLIC_SUPABASE_URL: {envStatus.url}</div>
        <div>NEXT_PUBLIC_SUPABASE_ANON_KEY: {envStatus.key}</div>
        <div className="text-sm text-gray-400">
          URL: {envStatus.urlValue}
        </div>
        <div className="text-sm text-gray-400">
          Key: {envStatus.keyValue}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-600">
          <strong>Connection Status:</strong> {connectionStatus}
        </div>
        <div className="mt-2">
          <strong>Auth Test Status:</strong> {authTestStatus}
        </div>
        <button 
          onClick={testAuth}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Auth Directly
        </button>
        <button 
          onClick={testNetwork}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Test Network Connectivity
        </button>
      </div>
    </div>
  );
};

export default EnvTest; 