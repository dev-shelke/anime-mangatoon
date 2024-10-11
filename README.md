# Cloud Computing Assignment Documentation

This project is a web application hosted on AWS with an Nginx server, Auto Scaling Group (ASG), and an Application Load Balancer (ALB). The application dynamically scales to handle traffic, supports HTTPS, and is accessible via a custom domain. 

## Components
- **AWS EC2**: Hosts the application using Nginx.
- **AWS Application Load Balancer (ALB)**: Distributes incoming traffic.
- **AWS Auto Scaling Group (ASG)**: Ensures the application scales based on traffic.
- **AWS Certificate Manager (ACM)**: Provides an SSL certificate for HTTPS.
- **Route 53**: Manages the DNS for the custom domain.

## Step-by-Step Setup

### 1. Launching an EC2 Instance
- Created an EC2 instance with Ubuntu 20.04 and installed Nginx.
- Configured security groups to allow traffic on ports 80 (HTTP) and 443 (HTTPS).
- Deployed the web application on the EC2 instance.

### 2. Configuring Nginx
- Updated the Nginx configuration file:
  - Set the document root to `/var/www/html`.
  - Configured health check endpoints.
  - Enabled SSL and provided the certificate from AWS ACM for HTTPS traffic.

Sample Nginx configuration:
```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    listen 443 ssl;  # Enable SSL
    ssl_certificate /etc/ssl/certs/acm_cert.pem;  # Certificate path
    ssl_certificate_key /etc/ssl/private/acm_key.pem;  # Key path

    server_name animemanga.devshelke.cloud;

    root /var/www/html;

    location / {
        try_files $uri $uri/ =404;
    }

    location /health {
        return 200 'Healthy';
    }


```

### 3. Setting Up Auto Scaling Group (ASG)
Created an Auto Scaling Group to automatically scale EC2 instances based on CPU utilization (threshold: 60%).
Configured launch templates to ensure that new instances have the application code deployed and Nginx configured.
### 4. Creating the Application Load Balancer (ALB)
Set up an ALB to distribute traffic across EC2 instances.
Configured listeners on both HTTP (port 80) and HTTPS (port 443).
Created target groups for EC2 instances and set health checks.
### 5. Mapping Custom Domain with Route 53
Used AWS Route 53 to map the custom domain animemanga.devshelke.cloud to the ALB DNS name.
Created an alias record to point the domain to the ALB.
### 6. Enabling SSL/TLS
Used AWS Certificate Manager (ACM) to issue an SSL certificate.
Configured the ALB to use the SSL certificate for HTTPS traffic.


#### 2.3 **Troubleshooting**

```md
## Troubleshooting

### Common Issues Encountered:
- **Health Checks Failing**: Ensure the correct health check path (`/health`) is configured in both Nginx and the target group.
- **502 Bad Gateway**: Verify that the Nginx configuration is correct and the application is running on the EC2 instance.
- **Unsecured Custom Domain**: If the domain is not secure, ensure the SSL certificate is correctly associated with the ALB in AWS.

### Commands Used:
- Checking Nginx status:
  ```bash
  sudo systemctl status nginx

#### 2.4 **Future Enhancements**

```
#### 2.4 **Future Enhancements**
## Future Enhancements

- Enable automatic deployment using GitHub Actions to deploy updates to the EC2 instances.
- Integrate AWS CodeDeploy with Auto Scaling Group for seamless updates across multiple instances.
- Add database integration for dynamic content delivery.

