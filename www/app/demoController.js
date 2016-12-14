app.controller('demoCtrl', function ($rootScope, $state, $scope, MultiLoading, Utils, $localStorage, Api, $interval, Sqlite_save, $ionicHistory) {

	/* Create Or Open Database  */
	Sqlite_save.create_open_db().then(
		function (db) {

			/* Create table  (tablename and parameters) */
			Sqlite_save.create_table('demo_table1', '(id integer primary key autoincrement ,name text ,Email text)').then(
				function (db) {

					/* Insert into table (tablename and values) */
					Sqlite_save.insert_data('demo_table1', 'VALUES (1,"Kalyani Kaushik","kka@narola.email")').then(
						function (res) {
							Utils.showPopup(JSON.stringify(res), 'DB Insert Success');
						},
						function (error) {
							console.log(error);
						});
				},
				function (error) {
					console.log(error);
				});
		},
		function (error) {
			console.log(error);
		});

	/* Alter table name  (oldtablename and newtablename) */
	/* Sqlite_save.alter_table_name('demo_table', 'demo_table1').then(
       	function(db) {
		},
        function(error) {
        Utils.showPopup(JSON.stringify(error),'DB Error');
    });*/

	/* Drop table (tablename) */
	/*Sqlite_save.drop_table('demo_table').then(
		function(res) {
		},
        function(error) {
	    	Utils.showPopup(JSON.stringify(error),'DB Error');
    });*/

	/* Add column to table  (tablename , column_name and column_definition) */
	/* Sqlite_save.add_column_table('demo_table1', 'Email', 'TEXT').then(
		function(res) {
		},
        function(error) {
        	Utils.showPopup(JSON.stringify(error),'DB Error');
	});*/

	/* select_All from table (tablename) */
    /* Sqlite_save.select_All('demo_table1').then(
		function(dbusers) {
			//alert(JSON.stringify(dbusers));
		},
		function(error) {
   			Utils.showPopup(JSON.stringify(error),'DB Error');
	});*/

	/* select_by_condition from table (tablename,condition) */
	/* Sqlite_save.select_by_condition('demo_table1', ' name="Kalyani Kaushik" ').then(
		function(dbusers) {
			//alert(JSON.stringify(dbusers));
		},
		function(error) {
   			Utils.showPopup(JSON.stringify(error),'DB Error');
	});*/

	/* update_by_condition from table (tablename,parameters,condition) */
	/* Sqlite_save.update_by_condition('demo_table1', 'name="Kalyani1 Kaushik1"', 'name="Kalyani Kaushik"').then(
		function(dbusers) {
		},
		function(error) {
      		Utils.showPopup(JSON.stringify(error),'DB Error');
	});*/

	/* delete_by_condition from table (tablename,condition) */
    /* Sqlite_save.delete_by_condition('demo_table1', 'name="Kalyani1 Kaushik1"').then(
		function(dbusers) {
		},
		function(error) {
        	Utils.showPopup(JSON.stringify(error),'DB Error');
	});*/

	$scope.goback = function () {
		$ionicHistory.goBack();
	}

});