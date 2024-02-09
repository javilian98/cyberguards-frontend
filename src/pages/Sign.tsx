import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Sign = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  // New state hooks for signup form
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [businessUnit, setBusinessUnit] = useState('');

  const handleLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    // Authentication logic placeholder
    toast({
      title: "Login Attempt",
      description: "This will show a toast notification upon clicking the login button.",
    });
    navigate('/home'); // Navigate to the Home page
  };

  // Placeholder for handling signup logic
  const handleSignup = (event: React.MouseEvent) => {
    event.preventDefault();
    // Here, you would include logic to handle user registration
    navigate('/'); // Navigate to the Sign page
  };

  return (
    <div style={{ backgroundImage: "@/components/Image/bg.jpg", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex items-center justify-center min-h-screen">
    <Tabs defaultValue="signin" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Please sign in with your email and password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleLogin}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Fill in your details to create an account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="firstname">First Name</Label>
              <Input id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastname">Last Name</Label>
              <Input id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" value={gender} onChange={(e) => setGender(e.target.value)}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="businessUnit">Business Unit</Label>
              <Input id="businessUnit" value={businessUnit} onChange={(e) => setBusinessUnit(e.target.value)}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleSignup}>Register</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
    </div>
  );
};

export default Sign;
