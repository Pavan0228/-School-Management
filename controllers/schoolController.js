import { addSchool, getAllSchools } from "../models/schoolModel.js";
import { calculateDistance } from "../utils/haversine.js";

export async function handleAddSchool(req, res) {
    const { name, address, latitude, longitude } = req.body;
    try {
        const schoolId = await addSchool({ name, address, latitude, longitude });
        res.status(201).json({
            message: "School added successfully",
            schoolId,
        });
    } catch (error) {
        console.error("Error adding school:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function handleListSchools(req, res) {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    try {
        const schools = await getAllSchools();
        const schoolsWithDistance = schools.map((school) => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude),
        }));
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json({
            userLocation: { latitude: userLat, longitude: userLon },
            schools: schoolsWithDistance.map((school) => ({
                id: school.id,
                name: school.name,
                address: school.address,
                latitude: school.latitude,
                longitude: school.longitude,
                distance: Math.round(school.distance * 100) / 100,
            })),
        });
    } catch (error) {
        console.error("Error listing schools:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
