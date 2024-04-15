let express = require('express');
let path = require('path');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
const { DATABASE_URL } = process.env;



let app = express()
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
        require: true,
    },
});

async function getPostgresVersion() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT version()');
        console.log(res.rows[0]);
    } finally {
        client.release();
    }
}

getPostgresVersion();


app.post('/userimage', async (req, res) => {
    try {
        const { profileimage, username } = req.body;

        const query = `INSERT INTO userprofile(profileimage,username) VALUES ($1,$2)`
        const values = [profileimage, username];
        await pool.query(query, values);
        res.status(201).json({ message: 'Profile image uploaded successfully' });
    } catch (error) {
        console.error('Error uploading image', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/completedprojects', async (req, res) => {
    try {
        const { price, image_url, title, location, description, car_park, bathroom, bedroom, room_size } = req.body;

        const query = `INSERT INTO completedprojects(price,image_url,title,location,description,car_park,bathroom,bedroom,room_size) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
        const values = [price, image_url, title, location, description, car_park, bathroom, bedroom, room_size];
        await pool.query(query, values);
        res.status(201).json({ message: 'Completed project added successfully' });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/upcomingprojects', async (req, res) => {
    try {
        const { price, image_url, title, location, description, car_park, bathroom, bedroom, room_size } = req.body;

        const query = `INSERT INTO upcomingprojects(price,image_url,title,location,description,car_park,bathroom,bedroom,room_size) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
        const values = [price, image_url, title, location, description, car_park, bathroom, bedroom, room_size];
        await pool.query(query, values);
        res.status(201).json({ message: 'Upcoming project added successfully' });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})



app.post('/projects', async (req, res) => {
    try {
        const { price, image_url, title, location, description, car_park, bathroom, bedroom, room_size, progress_percentage } = req.body;

        // Insert project into database
        const query = `
      INSERT INTO projectlistings (price, image_url, title, location, description, car_park, bathroom, bedroom, room_size,progress_percentage) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)
    `;
        const values = [price, image_url, title, location, description, car_park, bathroom, bedroom, room_size, progress_percentage];
        await pool.query(query, values);
        res.status(201).json({ message: 'Project added successfully' });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/projectimage', async (req, res) => {
    try {
        const { galleryimage } = req.body;

        const query = `INSERT INTO imagelist (galleryimage)
    VALUES ($1)`;
        const value = [galleryimage];
        await pool.query(query, value);
        res.status(201).json({ message: 'Image upload successfully' });
    } catch (error) {
        console.error('Error adding image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/contact', async (req, res) => {
    try {
        const { name, phone_number, subject, message } = req.body;

        // Insert project into database
        const query = `
      INSERT INTO contact_us (name,phone_number,subject,message) 
      VALUES ($1, $2, $3, $4)
    `;
        const values = [name, phone_number, subject, message];
        await pool.query(query, values);
        res.status(201).json({ message: 'Submit successfully' });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/email', async (req, res) => {
    try {
        const { email } = req.body;

        // Insert project into database
        const query = `
      INSERT INTO emaillist (email) 
      VALUES ($1)
    `;
        const values = [email];
        await pool.query(query, values);
        res.status(201).json({ message: 'Email submit successfully' });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/userimage', async (req, res) => {
    try {
        const query = 'SELECT * FROM userprofile';
        const { rows } = await pool.query(query)
        res.json(rows);
    } catch (error) {
        console.error('Error fetching image', error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.get('/allprojects', async (req, res) => {
    try {
        const query = 'SELECT * FROM projectlistings';
        const { rows } = await pool.query(query)
        res.json(rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/upcomingprojects', async (req, res) => {
    try {
        const query = 'SELECT * FROM upcomingprojects';
        const { rows } = await pool.query(query)
        res.json(rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/contact', async (req, res) => {
    try {
        const query = 'SELECT * FROM contact_us';
        const { rows } = await pool.query(query)
        res.json(rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.get('/allcompletedprojects', async (req, res) => {
    try {
        const query = 'SELECT * FROM completedprojects';
        const { rows } = await pool.query(query)
        res.json(rows);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/allgalleryimages', async (req, res) => {
    try {
        const query = 'SELECT * FROM imagelist';
        const { rows } = await pool.query(query)
        res.json(rows);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.delete('/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM contact_us WHERE id=$1', [id]);
            res.status(200).json({ message: 'Contact deleted successfully' });
        } catch (error) {
            console.error('Error deleting contact:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/upcomingprojects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM upcomingprojects WHERE id=$1', [id]);
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error) {
            console.error('Error deleting contact:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM projectlistings WHERE id=$1', [id]);
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error) {
            console.error('Error deleting project:', error);
            res.status(500).json({ error: 'An error occurred while deleting the project' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/completedprojects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM completedprojects WHERE id=$1', [id]);
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error) {
            console.error('Error deleting project:', error);
            res.status(500).json({ error: 'An error occurred while deleting the project' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.delete('/projectimages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        try {
            await pool.query('DELETE from imagelist WHERE id=$1', [id]);
            res.status(200).json({ message: 'Image deleted successfully' });
        } catch (error) {
            console.error('Error deleting image:', error);
            res.status(500).json({ error: 'An error occurred while deleting the project' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/completedprojects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { price, image_url, title, location, description, car_park, bathroom, bedroom, room_size } = req.body;
        const checkProjectQuery = 'SELECT * FROM completedprojects WHERE id =$1'
        const { rows } = await pool.query(checkProjectQuery, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        const updateQuery = `UPDATE completedprojects
      SET
      price = $1,
      image_url =$2,
      title = $3,
      location =$4,
      description = $5,
      car_park = $6,
      bathroom = $7,
      bedroom = $8,
      room_size = $9
      WHERE id =$10`
        await pool.query(updateQuery, [price, image_url, title, location, description, car_park, bathroom, bedroom, room_size, id])
        res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.put('/upcomingprojects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { price, image_url, title, location, description, car_park, bathroom, bedroom, room_size } = req.body;
        const checkProjectQuery = 'SELECT * FROM upcomingprojects WHERE id =$1'
        const { rows } = await pool.query(checkProjectQuery, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        const updateQuery = `UPDATE upcomingprojects
      SET
      price = $1,
      image_url =$2,
      title = $3,
      location =$4,
      description = $5,
      car_park = $6,
      bathroom = $7,
      bedroom = $8,
      room_size = $9
      WHERE id =$10`
        await pool.query(updateQuery, [price, image_url, title, location, description, car_park, bathroom, bedroom, room_size, id])
        res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.put('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { price, image_url, title, location, description, car_park, bathroom, bedroom, room_size, progress_percentage } = req.body;
        const checkProjectQuery = 'SELECT * FROM projectlistings WHERE id =$1'
        const { rows } = await pool.query(checkProjectQuery, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        const updateQuery = `UPDATE projectlistings
    SET 
    price = $1, 
    image_url = $2, 
    title = $3, 
    location = $4, 
    description = $5, 
    car_park = $6,
    bathroom = $7, 
    bedroom = $8, 
    room_size = $9,
    progress_percentage=$10
    WHERE id =$11`
        await pool.query(updateQuery, [price, image_url, title, location, description, car_park, bathroom, bedroom, room_size, progress_percentage, id])
        res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});