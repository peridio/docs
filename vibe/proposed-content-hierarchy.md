# Proposed Unified Documentation Hierarchy

## Overview
Reorganize documentation to follow Edge Impulse's user-journey approach with Avocado OS as the primary pathway for customer acquisition.

## **Priority 1: Primary User Pathways**

### **1. 🚀 Getting Started**
**Purpose**: Quick 15-minute evaluation and path selection
- **Quick Start** - Immediate value demonstration
- **Choose Your Path**:
  - → Avocado OS + Hardware (primary - most customers)
  - → Peridio Core Platform (API-first/cloud-only)
  - → Evaluation Kit (hands-on demo)

### **2. 🔧 Avocado OS + Hardware** ⭐ **PRIMARY PATHWAY**
**Purpose**: Embedded Linux + hardware solutions (main customer beachhead)
- **Overview** - Production-ready embedded Linux
- **Getting Started** - Hardware selection and first boot
- **Hardware Solutions** (elevated from current solutions/):
  - **NVIDIA Jetson Orin Nano** - AI/vision applications
  - **NXP i.MX 8MP** - Industrial vision & edge AI
  - **Raspberry Pi Family** - Development and prototyping
  - **Industrial Platforms** - Ruggedized deployments
- **Development Workflow**:
  - Yocto Integration
  - Buildroot Integration
  - peridiod Agent Configuration
  - Secure Boot & Updates
- **Reference Designs** - Board-specific implementations
- **Production Deployment** - From prototype to fleet

### **3. ⚡ Peridio Core Platform**
**Purpose**: Cloud-first CI/CD for embedded devices
- **Overview** - Platform capabilities and API-first approach
- **Getting Started** - Current platform/getting-started.md
- **Core Concepts**:
  - Device & Fleet Management
  - Binary Management & Signing
  - Update Orchestration
  - Security & Authentication
- **Integration Guides** - API usage patterns
- **CLI Reference** - Command-line tools

## **Priority 2: Supporting Content**

### **4. 🎯 Use Cases & Industries**
**Purpose**: Solution-focused content for specific verticals
- **Smart Industrial Cameras** - Vision processing
- **Autonomous Systems** - Robotics and mobile platforms
- **Edge AI Gateways** - Local inference and processing
- **Quality Inspection** - Manufacturing applications
- **Fleet Monitoring** - Large-scale deployments

### **5. 📚 Developer Resources**
**Purpose**: Deep-dive technical content
- **Tutorials** - End-to-end workflows
- **Best Practices** - Security, deployment patterns
- **Troubleshooting** - Common issues & solutions
- **API Reference** - Complete technical documentation
- **Community** - Forums, examples, contributions

## **Content Migration Strategy**

### **High Priority Moves**
1. **Elevate hardware solutions** from `/solutions/` to main pathway #2
2. **Streamline getting started** to focus on path selection
3. **Reorganize integration docs** under Avocado OS pathway
4. **Consolidate platform docs** under Core Platform pathway

### **Medium Priority**
1. Create industry-focused use case content
2. Develop beginner-friendly tutorials
3. Enhance troubleshooting resources

### **Low Priority**
1. Community features and contribution guides
2. Advanced integration patterns
3. Extended API examples

## **Key Benefits**
- **Customer-focused navigation** - "What do you want to do?" vs "What features do we have?"
- **Clear primary path** - Avocado OS as the main customer journey
- **Reduced cognitive load** - Eliminates platform/integration confusion
- **Better discovery** - Hardware solutions more prominent
- **Scalable structure** - Easy to add new hardware/industries

## **Success Metrics**
- Time to first successful deployment
- Documentation engagement on Avocado OS pathway
- Reduction in support tickets for getting started
- Hardware solution page conversion rates