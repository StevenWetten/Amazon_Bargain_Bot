import geni.portal as portal
import geni.rspec.pg as pg
import geni.rspec.igext as IG
   
pc = portal.Context()

pc.defineParameter("nodeType", "Node type: XenVM or RawPC",
                   portal.ParameterType.STRING, "XenVM" )
pc.defineParameter( "n", 
                   "Number of nodes (3 or more)", 
                   portal.ParameterType.INTEGER, 3 )
pc.defineParameter( "corecount", 
                   "Number of cores in each node.  NB: Make certain your requested cluster can supply this quantity.", 
                   portal.ParameterType.INTEGER, 4)
pc.defineParameter( "ramsize", "MB of RAM in each node.  NB: Make certain your requested cluster can supply this quantity.", 
                   portal.ParameterType.INTEGER, 4096 )
params = pc.bindParameters()
request = pc.makeRequestRSpec()

tourDescription = \
"""
This profile provides the template for Docker and Kubernetes installed on Ubuntu 22.04
"""

# Setup the Tour info with the above description and instructions.
tour = IG.Tour()
tour.Description(IG.Tour.TEXT,tourDescription)
request.addTour(tour)

prefixForIP = "192.168.1."
link = request.LAN("lan")

num_nodes = params.n
def setupNode(nodeName,nodeType,ramSize,coreCount):
   if nodeType == "RawPC":
      return request.RawPC(nodeName)
   else:
      node = request.XenVM(nodeName)
      node.cores = coreCount
      node.ram = ramSize
      return node

for i in range(num_nodes):
  if i == 0:
    node = setupNode("head", params.nodeType, params.ramsize, params.corecount)
  else:
    node = setupNode("worker-" + str(i), params.nodeType, params.ramsize, params.corecount)
  bs_landing = node.Blockstore("bs_" + str(i), "/image")
  bs_landing.size = "500GB"
  node.routable_control_ip = "true" 
  node.disk_image = "urn:publicid:IDN+emulab.net+image+emulab-ops:UBUNTU22-64-STD"
  iface = node.addInterface("if" + str(i))
  iface.component_id = "eth1"
  iface.addAddress(pg.IPv4Address(prefixForIP + str(i + 1), "255.255.255.0"))
  link.addInterface(iface)
  
  # install Docker
  node.addService(pg.Execute(shell="sh", command="sudo bash /local/repository/install_docker.sh"))
  node.addService(pg.Execute(shell="sh", command="sudo swapoff -a"))
  
  if i == 0:
    # install Kubernetes manager
    node.addService(pg.Execute(shell="sh", command="sudo bash /local/repository/kube_manager.sh " + str(num_nodes)))
    # install Helm
    node.addService(pg.Execute(shell="sh", command="sudo bash /local/repository/install_helm.sh"))
    # install and deploy registry
    node.addService(pg.Execute(shell="sh", command="sudo bash /local/repository/registry/setup_registry.sh"))
    # install and deploy Jenkins
    node.addService(pg.Execute(shell="sh", command="sudo bash /local/repository/launch_dashboard.sh"))
  else:
    node.addService(pg.Execute(shell="sh", command="sudo bash /local/repository/kube_worker.sh"))
    
pc.printRequestRSpec(request)
