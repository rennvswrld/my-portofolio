// This file catches all routes that don't match other routes 
import NotFound from '../not-found'; 
 
export default function CatchAllPage() { 
  return <NotFound />; 
} 
