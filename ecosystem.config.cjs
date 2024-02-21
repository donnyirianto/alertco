module.exports = {
  apps : [{ 
      name: "alertco",
      script: "server.js",
      instances: "1", // Use all available CPU cores
      max_memory_restart: "1G", // Restart if memory usage exceeds 1GB
      watch: false, // Set to true if you want to watch for file changes
      exec_mode: "fork", // Run in cluster mode for better performance
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }, 
    },
  ]
};
