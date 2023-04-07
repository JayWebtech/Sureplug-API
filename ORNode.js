User.find({$or:[{region: "NA"},{sector:"Some Sector"}]}, function(err, user) 
 {
    if (err)
    {
        res.send(err);
    }
    console.log(user);
    res.json(user);

 });