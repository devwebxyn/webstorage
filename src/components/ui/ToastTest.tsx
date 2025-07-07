import React from 'react';
import { useToast } from './toast';
import { Button } from './button';

export function ToastTest() {
  const { showToast, ToastContainer } = useToast();

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Toast Test Component</h2>
      <div className="space-x-4">
        <Button 
          variant="default" 
          onClick={() => showToast('This is a default toast message')}
        >
          Show Default Toast
        </Button>
        <Button 
          variant="destructive" 
          onClick={() => showToast('This is an error message', 'destructive')}
        >
          Show Error Toast
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
