app.factory('Sqlite_save', ['$rootScope', '$http', '$q', 'config', function ($rootScope, $http, $q, config) {
    var db = null;

	return {
		create_open_db: function () {
			var deferred = $q.defer();
			db = sqlitePlugin.openDatabase(config.db_name, config.db_version, '', 0);
			if (db) {
				deferred.resolve(db);
            } else {
				deferred.reject("Create Or Open Database is not possible at this time");
            }
            return deferred.promise;
        },
		create_table: function (tablename, parameters) {
			var deferred = $q.defer();
			var query = 'CREATE TABLE IF NOT EXISTS ' + tablename + ' ' + parameters;
            db.transaction(function (txn) {
				txn.executeSql(query, [], function (tx, res) {
					if (res) {
						deferred.resolve(res);
                    } else {
						deferred.reject("CREATE Table is not possible at this time");
                    }
                });
            });
			return deferred.promise;
        },
		alter_table_name: function (tablename, newtablename) {
			var deferred = $q.defer();
			var query = 'ALTER TABLE ' + tablename + ' RENAME TO ' + newtablename;
            db.transaction(function (txn) {
				txn.executeSql(query, [], function (tx, res) {
					if (res) {
                        deferred.resolve(res);
                    } else {
                        deferred.reject("Alter Table name is not possible at this time");
                    }
				});
			});
			return deferred.promise;
        },
		add_column_table: function (tablename, column_name, column_definition) {
			var deferred = $q.defer();
			var query = 'ALTER TABLE ' + tablename + ' ADD ' + column_name + ' ' + column_definition;
            db.transaction(function (txn) {
				txn.executeSql(query, [], function (tx, res) {
					if (res) {
                        deferred.resolve(res);
                    } else {
                        deferred.reject("Alter Table add column name is not possible at this time");
                    }
				});
			});
			return deferred.promise;
		},
		drop_table: function (tablename) {
			var deferred = $q.defer();
			var query = 'DROP TABLE ' + tablename;
            db.transaction(function (txn) {
                txn.executeSql(query, [], function (tx, res) {
					if (res) {
						deferred.resolve(res);
					} else {
						deferred.reject("DROP Table is not possible at this time");
					}
				});
			});
			return deferred.promise;
		},
		select_All: function (tablename) {
			var deferred = $q.defer();
			var query = 'SELECT * from ' + tablename;
			db.transaction(function (txn) {
				txn.executeSql(query, [], function (tx, res) {
					if (res.rows.length > 0) {
						deferred.resolve(res);
					} else {
						deferred.reject("Select is not possible at this time");
					}
				});
			});
			return deferred.promise;
		},
		select_by_condition: function (tablename, condition) {
			var deferred = $q.defer();
			var query = 'SELECT * from ' + tablename + ' where ' + condition;
			db.transaction(function (txn) {
				txn.executeSql(query, [], function (tx, res) {
					if (res.rows.length > 0) {
						deferred.resolve(res);
					} else {
						deferred.reject("Select is not possible at this time");
					}
				});
			});
			return deferred.promise;
		},
		update_by_condition: function (tablename, parameters, condition) {
			var deferred = $q.defer();
			var query = 'UPDATE ' + tablename + ' SET ' + parameters + ' Where ' + condition;
			db.transaction(function (txn) {
				txn.executeSql(query, [], function (tx, res) {
					if (parseInt(res.rowsAffected) > 1) {
						deferred.resolve(res);
					} else {
						deferred.reject("Update is not possible at this time");
					}
				});
			});
			return deferred.promise;
		},
		delete_by_condition: function (tablename, condition) {
			var deferred = $q.defer();
			var query = 'DELETE FROM ' + tablename + ' Where ' + condition;
			db.transaction(function (txn) {
				txn.executeSql(query, [], function (tx, res) {
					deferred.resolve(res);
				});
			});
			return deferred.promise;
		},
		insert_data: function (tablename, values) {
			var deferred = $q.defer();
			var query = 'INSERT INTO ' + tablename + ' ' + values;
            var query1 = "SELECT last_insert_rowid()";
			var deferred = $q.defer();
			db.transaction(function (txn) {
				txn.executeSql(query, [], function (tx, res) {
					if (res) {
						txn.executeSql(query1, [], function (tx, res2) {
							res2 = res2.rows._array[0]['last_insert_rowid()'];
							if (res2) {
								deferred.resolve(res2);
							} else {
								deferred.reject("Insert is not possible at this time");
                            }
						});
					} else {
						deferred.reject("Insert is not possible at this time");
                    }
                });
			});
			return deferred.promise;
		}
	}
}]);