import { useEffect, useState } from 'react';
import { LMStudioService } from '../services/lmStudio';
import { Badge } from './ui/badge';

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const connected = await LMStudioService.checkConnection();
      setIsConnected(connected);
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isChecking && isConnected === null) {
    return (
      <Badge variant="outline" className="animate-pulse">
        Checking connection...
      </Badge>
    );
  }

  return (
    <Badge 
      variant={isConnected ? "default" : "destructive"}
      className="cursor-pointer"
      onClick={checkConnection}
    >
      {isConnected ? "✓ LM Studio Connected" : "✗ LM Studio Disconnected"}
    </Badge>
  );
} 