# Review-server




# MongoDB Server on an EC2 instance

## Transfering data from local MongoDB to EC2 MongoDB
1. Connect to your local MongoDB instance and export the data. In the terminal of your local machine, run `mongodump`.
```
mongodump
```
See more options/specifications for mongodump [here](https://www.mongodb.com/docs/database-tools/mongodump/)

2. Note the path of your .pem file (to connect to the EC2 instance) and this dump directory.
3. Use scp (secure copy protocol) to copy this directory from your local machine to the EC2 instance. From your local machine, run this command
```
$scp -i ~/Documents/path_to_your_pem/access.pem -r ~/Documents/path_to_dump_directory ubuntu@0.0.0.0:/home/ubuntu/path_to_where_you_want_the_data
```
If this doesn't work, you can move your pem file to where the dump directory is, and cd into that directory. If you run `ls`, you'd see `access.pem dump`.
While in this directory, try running this command:

```
$scp -i access.pem -r dump ubuntu@0.0.0.0:/home/ubuntu/path_to_where_you_want_the_data
```

4. Restore those mongo files in your EC2 instance. While in your EC2 command line, run [mongorestore](https://www.mongodb.com/docs/database-tools/mongorestore/).
```
mongorestore dump/
```

## Accessing a MongoDB EC2 instance.

At this point, you've already set up your EC2 instance for a MongoDB server.
1. Connect to your EC2 instance
2. Restart mongo daemon (mongod)
```
sudo service mongod restart
```
3. Start mongo shell
```
mongosh
```
