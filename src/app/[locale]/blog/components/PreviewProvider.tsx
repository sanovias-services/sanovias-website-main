"use client";

import { createContext, useContext, ReactNode } from 'react';

interface PreviewContextType {
  isPreview: boolean;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export function PreviewProvider({ 
  children, 
  isPreview 
}: { 
  children: ReactNode; 
  isPreview: boolean; 
}) {
  return (
    <PreviewContext.Provider value={{ isPreview }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview(): PreviewContextType {
  const context = useContext(PreviewContext);
  if (context === undefined) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
}