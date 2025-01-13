import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Droplet } from 'lucide-react';

interface BloodDonor {
  id: number;
  name: string;
  bloodType: string;
  subdivision: string;
  email: string;
  number: string;
}

interface BloodBank {
  id: number;
  name: string;
  subdivision: string;
  email: string;
  number: string;
  availableBloodTypes: string[];
}

const BloodSeekersPage = () => {
  const [activeSection, setActiveSection] = useState<'donors' | 'banks'>('donors');
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [banks, setBanks] = useState<BloodBank[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<BloodDonor[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<BloodBank[]>([]);
  const [bloodType, setBloodType] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  // Fetch donors and banks from the API with the applied filters
  const fetchData = async () => {
    try {
      const [donorsResponse, banksResponse] = await Promise.all([
        axios.post("http://localhost:3000/blooddonor/find-donors", {
          state: "Tripura",
          subdivision: location,
          bloodType: bloodType,
        }),
        axios.post("http://localhost:3000/bloodbank/find-banks", {
          state: "Tripura",
          subdivision: location,
          bloodType: bloodType,
        })
      ]);

      setDonors(donorsResponse.data.donors);
      setBanks(banksResponse.data.banks);
      setFilteredDonors(donorsResponse.data.donors);
      setFilteredBanks(banksResponse.data.banks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [bloodType, location]);

  const toggleSection = (section: 'donors' | 'banks') => {
    setActiveSection(section);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white">
      <header className="sticky top-0 z-10 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Droplet className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-800">BloodLink</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/about" className="text-gray-600 hover:text-gray-800 transition">
              About
            </Link>
            <Link to="/bloodseekers" className="text-gray-600 hover:text-gray-800 transition">
              Find Blood
            </Link>
          </nav>
          <div className="flex space-x-2">
            <Link to="/register/blood-bank">
              <Button variant="outline" className="hidden md:inline-flex">
                Register as Blood Bank
              </Button>
            </Link>
            <Link to="/register/donor">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Become a Donor
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={() => toggleSection('donors')}
            variant={activeSection === 'donors' ? 'default' : 'outline'}
          >
            Blood Donors
          </Button>
          <Button
            onClick={() => toggleSection('banks')}
            variant={activeSection === 'banks' ? 'default' : 'outline'}
          >
            Blood Banks
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <select
            title="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded p-2 shadow hover:shadow-lg w-full sm:w-76"
          >
            <option value="">Select your Sub-Division</option>
            {/* Add all subdivision options */}
            <option value="Dukli">Dukli</option>
            <option value="Jirania">Jirania</option>
            <option value="Mohanpur">Mohanpur</option>
            <option value="Mandwi">Mandwi</option>
            <option value="Khowai">Khowai</option>
            <option value="Teliamura">Teliamura</option>
            <option value="Tulasikhar">Tulasikhar</option>
            <option value="Bishalgarh">Bishalgarh</option>
            <option value="Melaghar">Melaghar</option>
            <option value="Matabari">Matabari</option>
            <option value="Amarpur">Amarpur</option>
            <option value="Rajnagar">Rajnagar</option>
            <option value="Bakafa">Bakafa</option>
            <option value="Satchand">Satchand</option>
            <option value="Rupaichari">Rupaichari</option>
            <option value="Kadamtala">Kadamtala</option>
            <option value="Kanchanpur">Kanchanpur</option>
            <option value="Panisagar">Panisagar</option>
            <option value="Salema">Salema</option>
            <option value="Gandacherra">Gandacherra</option>
            <option value="Chawmanu">Chawmanu</option>
            <option value="Sadar">Sadar</option>
          </select>
          <select
            title="bloodType"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            className="border rounded p-2 shadow hover:shadow-lg w-full sm:w-76"
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {activeSection === 'donors' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDonors.map((donor) => (
              <div key={donor.id} className="border rounded-lg p-4 shadow-md">
                <h2 className="font-bold text-lg">{donor.name}</h2>
                <p>Blood Type: {donor.bloodType}</p>
                <p>Location: {donor.subdivision}</p>
                <p>Email: {donor.email}</p>
                <p>Number: {donor.number}</p>
                <Button className="mt-2" onClick={() => alert(`Contact ${donor.name}`)}>
                  Contact
                </Button>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'banks' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBanks.map((bank) => (
              <div key={bank.id} className="border rounded-lg p-4 shadow-md">
                <h2 className="font-bold text-lg">{bank.name}</h2>
                <p>Location: {bank.subdivision}</p>
                <p>Email: {bank.email}</p>
                <p>Number: {bank.number}</p>
                <p>Available Blood Types: {bank.availableBloodTypes.join(', ')}</p>
                <Button className="mt-2" onClick={() => alert(`Contact ${bank.name}`)}>
                  Contact
                </Button>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'donors' && filteredDonors.length === 0 && (
          <p className="mt-4 text-center">
            No donors found matching your criteria.
          </p>
        )}

        {activeSection === 'banks' && filteredBanks.length === 0 && (
          <p className="mt-4 text-center">
            No blood banks found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default BloodSeekersPage;

